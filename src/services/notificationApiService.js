import http from './httpService';
import apiEndPoints from './apiEndPoints';

const { notificationEndpoint } = apiEndPoints;

export const readNotifcation = async (id) => {
  const { data } = await http.put(`${notificationEndpoint}/read/${id}`);
  return data;
};
