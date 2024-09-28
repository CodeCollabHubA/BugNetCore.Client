import { HubConnectionBuilder } from '@microsoft/signalr';
import apiEndpoints from 'src/services/apiEndPoints';
import http from 'src/services/httpService';

const { notifyWsEndpoint, notificationEndpoint } = apiEndpoints;
const notifyConnection = new HubConnectionBuilder()
  .withUrl(notifyWsEndpoint, {
    accessTokenFactory: () => localStorage.getItem('token'),
  })
  .build();

const notificationConnectionStarting = [];

export default async function notificationConnection() {
  const result = {
    // if you need this you might be making a mistake
    // id: () => connection.connectionId,
    getAllNotifications: async () => {
      const res = await http.get(
        `${notificationEndpoint}?userId=${JSON.parse(localStorage.getItem('user')).id}`
      );

      const { data } = res;
      // console.log(data); return it 
      return data;
    },
    listenNotifications: () => {
      console.log('listening');
      return notifyConnection.on('ReceiveNotification', (n) => console.log(n));
    },

    stopListeningNotifications: () =>
      notifyConnection.stop().then(() => {
        // console.log('disconnected'); return it
        notifyConnection.off('ReceiveNotification');
      }),

    state: notifyConnection.state,
    onNotification: (callback) => {
      notifyConnection.on('ReceiveNotification', callback);
    },
  };

  if (notifyConnection.state === 'Connected') {
    return result;
  }

  if (notifyConnection.state === 'Disconnected') {
    const starting = notifyConnection.start();
    notificationConnectionStarting.push(starting);
    await starting;
  } else {
    await notificationConnectionStarting[0];
  }

  if (notificationConnectionStarting.length > 0) {
    notificationConnectionStarting.pop();
  }

  return result;
}
