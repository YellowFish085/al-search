import AniList from '@/anilist/AniList';
import Notifications from '@/utils/Notifications';
import StorageHelper from '@/utils/StorageHelper';

const browser = require('webextension-polyfill'); // eslint-disable-line

/**
 * AniList auth class.
 */
export default class Auth {
  /**
   * Begins auth flow with the browser identity auth flow.
   */
  private start(): Promise<string> {
    return browser.identity.launchWebAuthFlow({
      url: `${process.env.VUE_APP_ANILIST_AUTH_URL}&client_id=${process.env.VUE_APP_ANILIST_CLIENT_ID}`,
      interactive: true,
    });
  }

  /**
   * Process the given redirect url to return an URL object.
   */
  private getURL(url: string): URL {
    /**
     * Anilist returns the access token as an url fragment `#access_token=...`,
     * followed by query params `&X=...`.
     * It's a pain to handle, so we "transform" the hash as a query param.
     */
    return new URL(url.replace(`${browser.identity.getRedirectURL()}#`, `${browser.identity.getRedirectURL()}?`));
  }

  /**
   * Get the `access_token` parameter from the given URL.
   */
  private getURLAccessToken(url: URL): string | null {
    const urlParams = new URLSearchParams(url.search);

    return urlParams.get('access_token');
  }

  /**
   * Check if an access token is usable by AL Search.
   * If the token is usable, return the user data.
   */
  private async checkAccessToken(accessToken: string): Promise<ALSearch.AniList.User> {
    const anilist = new AniList(accessToken);

    return anilist.user();
  }

  /**
   * Store access token in local storage.
   */
  private storeAccessToken(accessToken: string): Promise<void> {
    return StorageHelper.setAccessToken(accessToken);
  }

  /**
   * Store user data in local storage.
   */
  private storeUser(user: ALSearch.AniList.User): Promise<void> {
    return StorageHelper.setUser(user);
  }

  /**
   * Launch OAuth flow with AniList.
   */
  async launch(): Promise<void> {
    try {
      // Start auth flow. Once finished, `redirectUrl` will contains the
      // redirect url from the OAuth flow with AniList.
      const redirectUrl = await this.start();

      // Try to get access token from redirect url. If it's not here, the
      // user probably canceled the authentication.
      const accessToken = this.getURLAccessToken(this.getURL(redirectUrl));

      if (accessToken === null) throw new Error(browser.i18n.getMessage('E_AuthMissingAccessToken'));

      // Try to get user data to be sure the token works.
      const user = await this.checkAccessToken(accessToken);

      // Token is valid, store it and the user data.
      await Promise.all([
        this.storeAccessToken(accessToken),
        this.storeUser(user),
      ]);

      Notifications.create('auth_success', browser.i18n.getMessage('AUTH_Success', user.name));
    }
    catch (e) {
      Notifications.create('auth_failed', browser.i18n.getMessage('E_AuthFailed', e.message));
      throw e;
    }
  }

  /**
   * Refresh user data in local storage.
   */
  async refreshUser(): Promise<void> {
    // Get access token from storage.
    const accessToken = await StorageHelper.getAccessToken();

    if (accessToken === null) throw new Error(browser.i18n.getMessage('E_StorageMissingAccessToken'));

    // Fetch user data.
    const anilist = new AniList(accessToken);

    const user = await anilist.user();

    // Store new user data.
    await this.storeUser(user);
  }

  /**
   * Logout user by removing its data from local storage.
   */
  async logout(): Promise<void> {
    await Promise.all([
      StorageHelper.removeAccessToken(),
      StorageHelper.removeUser(),
    ]);
  }
}
