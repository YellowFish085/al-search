import AniList from '@/anilist/AniList';
import Notifications from '@/utils/Notifications';

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
     * INFO: Writing this on 13/03/2020
     * AniList uses a special url syntax where instead of having
     * `?access_token=` it has `#access_token=`. So we need to
     * change the url to make it "generic".
     */
    return new URL(url.replace(`${browser.identity.getRedirectURL()}#`, `${browser.identity.getRedirectURL()}?`));
  }

  /**
   * Get the `access_token` parameter from the given URL.
   */
  private getURLAccessToken(url: URL): string|null {
    const urlParams = new URLSearchParams(url.search);

    return urlParams.get('access_token');
  }

  /**
   * Check if an access token is usable by AniSearch.
   * If the token is usable, return the user data.
   */
  private async checkAccessToken(accessToken: string): Promise<AniSearch.AniList.Schema.User> {
    const anilist = new AniList(accessToken);

    return anilist.user();
  }

  /**
   * Store access token in local storage.
   */
  private async storeAccessToken(accessToken: string): Promise<void> {
    return browser.storage.local.set({ accessToken });
  }

  /**
   * Store user data in local storage.
   */
  private async storeUser(user: AniSearch.AniList.Schema.User): Promise<void> {
    return browser.storage.local.set({ user });
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

      if (accessToken === null) throw new Error('Missing access token after AniList authentication');

      // Try to get user data to be sure the token works.
      const user = await this.checkAccessToken(accessToken);

      // Token is valid, store it and the user data.
      await this.storeAccessToken(accessToken);
      await this.storeUser(user);

      Notifications.create('auth_success', `You are now logged in as ${user.name}`);
    }
    catch (e) {
      Notifications.create('auth_failed', `Authentication failed: ${e.message}`);
      throw e;
    }
  }

  /**
   * Refresh user data in local storage.
   */
  async refreshUser(): Promise<void> {
    // Get access token from storage.
    const accessToken = await browser.storage.local.get('accessToken');

    if (accessToken.accessToken === null) throw new Error('Missing access token in local storage');

    // Fetch user data.
    const anilist = new AniList(accessToken.accessToken);

    const user = await anilist.user();

    // Store new user data.
    await this.storeUser(user);
  }

  /**
   * Logout user by removing its data from local storage.
   */
  async logout(): Promise<void> {
    await browser.storage.local.remove('accessToken');
    await browser.storage.local.remove('user');
  }
}
