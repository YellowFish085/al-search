import Anilist from './anilist/anilist.js';
import Env from '../env.js';
import Storage from './utils/storage.js'

if (!('browser' in self)) {
  self.browser = self.chrome;
}

export default class Auth {
  /**
   * Start login process.
   */
  static async login() {
    const redirectUrl = await browser.identity.launchWebAuthFlow({
      url:         `https://anilist.co/api/v2/oauth/authorize?response_type=token&client_id=${Env.anilist.client_id}`,
      interactive: true,
    });
    const url         = new URL(redirectUrl.replace(
      `${browser.identity.getRedirectURL()}#`,
      `${browser.identity.getRedirectURL()}?`
    ));
    const accessToken = url.searchParams.get('access_token');

    if (accessToken === null) {
      throw new Error(browser.i18n.getMessage('ERROR_MissingAccessToken'));
    }

    // Store access token and user data.
    const user = await (new Anilist(accessToken)).user();

    await Promise.all([
      Storage.set(Storage.KEYS.ACCESS_TOKEN, accessToken),
      Storage.set(Storage.KEYS.USER, user),
    ]);

    return user;
  }

  /**
   * Refresh local user data.
   */
  static async refresh() {
    const accessToken = await Storage.get(Storage.KEYS.ACCESS_TOKEN);

    if (accessToken === null) {
      throw new Error(browser.i18n.getMessage('ERROR_MissingAccessTokenInStorage'));
    }

    // Fetch user data.
    const user = await (new Anilist(accessToken)).user();

    // Store new user data.
    await Storage.set(Storage.KEYS.USER, user);

    return user;
  }

  /**
   * Logout user.
   */
  static async logout() {
    return Promise.all([
      Storage.remove(Storage.KEYS.ACCESS_TOKEN),
      Storage.remove(Storage.KEYS.USER),
    ]);
  }
}