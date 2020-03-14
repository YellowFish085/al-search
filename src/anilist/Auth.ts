import { UserSchema } from '@/anilist/graphql/user';
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
  private async checkAccessToken(accessToken: string): Promise<UserSchema> {
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
  private async storeUser(user: UserSchema): Promise<void> {
    return browser.storage.local.set({ user });
  }

  /**
   * Launch OAuth flow with AniList.
   */
  async launch(): Promise<boolean> {
    try {
      // Start auth flow. Once finished, `redirectUrl` will contains the
      // redirect url from the OAuth flow with AniList.
      const redirectUrl = await this.start();

      // Try to get access token from redirect url. If it's not here, the
      // user probably canceled the authentication.
      const accessToken = this.getURLAccessToken(this.getURL(redirectUrl));

      if (accessToken === null) return false;

      // Try to get user data to be sure the token works.
      const user = await this.checkAccessToken(accessToken);

      // Token is valid, store it and the user data.
      await this.storeAccessToken(accessToken);
      await this.storeUser(user);

      Notifications.create('auth_success', Notifications.messages.auth.success(user.name));

      return true;
    } catch (e) {
      Notifications.create('auth_failed', Notifications.messages.error('Authentication failed', e.message));
    }

    return false;
  }

  /**
   * Refresh user data in local storage.
   */
  async refreshUser(): Promise<undefined|string> {
    try {
      // Get access token from storage.
      const accessToken = await browser.storage.local.get('accessToken');

      if (accessToken.accessToken === null) return 'Missing access token';

      // Fetch user data.
      const anilist = new AniList(accessToken.accessToken);

      const user = await anilist.user();

      // Store new user data.
      await this.storeUser(user);
    } catch (e) {
      return e.message;
    }

    return undefined;
  }

  /**
   * Logout user by removing its data from local storage.
   */
  async logout(): Promise<undefined|string> {
    try {
      await browser.storage.local.remove('accessToken');
      await browser.storage.local.remove('user');
    } catch (e) {
      return e.message;
    }

    return undefined;
  }
}
