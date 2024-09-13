import { HubConnectionBuilder } from '@microsoft/signalr';
import apiEndpoints from '../services/apiEndPoints';

const { chatWsEndpoint } = apiEndpoints;
const connection = new HubConnectionBuilder().withUrl(chatWsEndpoint).build();

const connectionStarting = [];

export default async function chatConnection() {
  let currentRequestId = '';
  let currentUserId = '';
  const result = {
    // if you need this you might be making a mistake
    // id: () => connection.connectionId,
    send: (message) =>
      connection.send('SendMessage', {
        SupportRequestId: currentRequestId,
        SenderId: currentUserId,
        MessageText: message,
      }),
    create: () => connection.invoke('create'),
    join: async (requestId, userId) => {
      const history = await connection.invoke('JoinRoom', {
        SupportRequestId: requestId,
        UserId: userId,
      });
      console.log('message history', history);
      currentRequestId = requestId;
      currentUserId = userId;
      connection.on('ReceiveMessage', (m) => console.log(m));

      return history;
    },
    leave: () =>
      connection.send('LeaveRoom', { SupportRequestId: currentRequestId }).then(() => {
        currentRequestId = '';
        // function reference needs to be the same to work
        // connection.off('send_message', m => console.log(m)) // doesn't work
        // connection.off('send_message', logMessage) // works
        connection.off('ReceiveMessage');
        return connection.stop();
      }),

    state: connection.state,
    onMessage: (callback) => {
      connection.on('ReceiveMessage', callback);
    },
  };

  if (connection.state === 'Connected') {
    return result;
  }

  if (connection.state === 'Disconnected') {
    const starting = connection.start();
    connectionStarting.push(starting);
    await starting;
  } else {
    await connectionStarting[0];
  }

  if (connectionStarting.length > 0) {
    connectionStarting.pop();
  }

  return result;
}
