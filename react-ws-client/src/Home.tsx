import { useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';
import useWebSocket from 'react-use-websocket';
import { UserMap } from './types/index';
import { Cursor } from './components/Cursor';
import { UUID } from 'crypto';

const renderCursors = (users: UserMap) => {
  console.log(users);
  return Object.keys(users).map((uuid) => {
    console.log(uuid);
    const user = users[uuid as unknown as UUID];

    return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
  });
};

const renderUsersList = (users: UserMap) => {
  return (
    <ul>
      {Object.keys(users).map((uuid) => {
        return (
          <li key={uuid}>{JSON.stringify(users[uuid as unknown as UUID])}</li>
        );
      })}
    </ul>
  );
};

export function Home({ username }: { username: string }) {
  const WS_URL = 'ws://127.0.01:8000';
  const THROTTLE = 100;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<UserMap>(WS_URL, {
    queryParams: { username },
  });

  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    //Set user in middle before user move
    sendJsonMessage({
      x: 0,
      y: 0,
    });

    window.addEventListener('mousemove', (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  if (lastJsonMessage) {
    return (
      <>
        {renderCursors(lastJsonMessage)}
        {renderUsersList(lastJsonMessage)}
      </>
    );
  }

  return <h1>Hello, {username}</h1>;
}
