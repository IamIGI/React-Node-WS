import useWebSocket from 'react-use-websocket';

export function Home({ username }: { username: string }) {
  const WS_URL = 'ws://127.0.01:8000';
  const x = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  return <h1>Hello, {username}</h1>;
}
