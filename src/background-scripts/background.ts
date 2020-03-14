import Auth from '@/anilist/Auth';

const browser = require('webextension-polyfill'); // eslint-disable-line

function handleMessage(request: any, sender: any, sendResponse: any) { // eslint-disable-line
  const auth = new Auth();

  switch (request.code) {
    case 'AUTH_START':
      auth.launch().then((r) => {
        sendResponse({ code: r === true ? 'AUTH_SUCCESS' : 'AUTH_FAILED' });
      });
      break;

    case 'USER_REFRESH':
      auth.refreshUser().then((r) => {
        sendResponse({
          code: r === undefined ? 'USER_REFRESH_SUCCESS' : 'USER_REFRESH_FAILED',
          message: r,
        });
      });
      break;

    case 'USER_LOGOUT':
      auth.logout().then((r) => {
        sendResponse({
          code: r === undefined ? 'USER_LOGOUT_SUCCESS' : 'USER_LOGOUT_FAILED',
          message: r,
        });
      });
      break;

    default:
      break;
  }

  // Keep listener active to wait for async response.
  return true;
}

browser.runtime.onMessage.addListener(handleMessage);
