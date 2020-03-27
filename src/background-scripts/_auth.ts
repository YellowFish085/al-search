import Auth from '@/anilist/Auth';

/**
 * Start auth.
 */
async function authStart(sendResponse: Function) {
  const auth = new Auth();

  try {
    await auth.launch();
    sendResponse({ code: 'AUTH_SUCCESS' });
  }
  catch (e) {
    sendResponse({ code: 'AUTH_FAILED', message: e.message });
  }
}

/**
 * Refresh local user data.
 */
async function userRefresh(sendResponse: Function) {
  const auth = new Auth();

  try {
    await auth.refreshUser();
    sendResponse({ code: 'USER_REFRESH_SUCCESS' });
  }
  catch (e) {
    sendResponse({ code: 'USER_REFRESH_FAILED', message: e.message });
  }
}

/**
 * Logout user.
 */
async function userLogout(sendResponse: Function) {
  const auth = new Auth();

  try {
    await auth.logout();
    sendResponse({ code: 'USER_LOGOUT_SUCCESS' });
  }
  catch (e) {
    sendResponse({ code: 'USER_LOGOUT_FAILED', message: e.message });
  }
}

export default {
  authStart,
  userRefresh,
  userLogout,
};
