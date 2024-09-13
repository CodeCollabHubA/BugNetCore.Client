export const apiUrl = 'https://bugapi.ahmedyassin.dev/api/v1-Beta';
export const baseUrl = 'https://bugapi.ahmedyassin.dev';

const apiEndPoints = {
  baseUrl,
  apiUrl,
  chatWsEndpoint: `${baseUrl}/chat`,
  notifyWsEndpoint: `${baseUrl}/hubs/notification`,
  getGitHubOAuthEndpoint: (returnUrl = window.location.href) =>
    `${apiUrl}/Auth/oauth/github-login?returnUrl=${returnUrl}`,
  logApiEndpoint: `${apiUrl}/Auth/Login`,
  regApiEndpoint: `${apiUrl}/Auth/Register`,
  getVerifyEmailApiEndpoint: (token) => `${apiUrl}/Auth/verify/${token}`,
  requestPasswordResetApiEndpoint: `${apiUrl}/Auth/reset-password/request`,
  getConfirmPasswordResetApiEndpoint: (token) => `${apiUrl}/Auth/reset-password/confirm/${token}`,
  notificationEndpoint: `${apiUrl}/Notification`,
  bugApi: `${apiUrl}/Bug`,
  chatMessageApi: `${apiUrl}/ChatMessage`,
  commentApi: `${apiUrl}/Comment`,
  notificationApi: `${apiUrl}/Notification`,
  projectApi: `${apiUrl}/Project`,
  supportRequestApi: `${apiUrl}/SupportRequest`,
  userApi: `${apiUrl}/User`,
};
export default apiEndPoints;
