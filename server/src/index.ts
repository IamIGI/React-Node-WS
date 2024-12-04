import http from 'http';
import { RawData, WebSocketServer } from 'ws';
import url from 'url';
import { randomUUID, UUID } from 'crypto';
import { Message, UserMap, WebSocketMap } from './types';
import utils from './utils';

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

const connections: WebSocketMap = {};
const users: UserMap = {};

const broadcast = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid as UUID];
    const message = JSON.stringify(users);
    connection.send(message);
  });
};

function handleMessage(bytes: RawData, uuid: UUID) {
  const message = JSON.parse(bytes.toString()) as Message;
  const user = users[uuid];
  user.state = message;

  broadcast();

  console.log(
    `${user.username} updated their state: ${JSON.stringify(user.state)}`
  );
}

function handleClose(uuid: UUID) {
  //remove ref to objects
  console.log(`${users[uuid].username} disconnected`);
  delete connections[uuid];
  delete users[uuid];

  broadcast();
}

wsServer.on('connection', (connection, request) => {
  // ws://localhost:<port>?username=Alex

  if (!request.url) {
    console.error(`No request url: ${request.url}`);
    return;
  }

  const { username } = url.parse(request.url, true).query;
  if (!username) {
    console.error(`No username provided`);
    return;
  }

  const uuid = randomUUID();
  console.log(`${username} - ${uuid}`);

  //broadcast // fan out -- make connection to every connected user;
  connections[uuid] = connection;
  users[uuid] = {
    username: utils.isList(username) ? username[0] : username,
    state: {
      x: 0,
      y: 0,
    },
  };

  connection.on('message', (message) => handleMessage(message, uuid));
  connection.on('close', () => handleClose(uuid));
});

server.listen(8000, () => {
  console.log(`Websocket server is running on port: ${port}`);
});
