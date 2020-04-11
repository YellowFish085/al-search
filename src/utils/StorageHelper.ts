const browser = require('webextension-polyfill'); // eslint-disable-line

class StorageHelper {
  /**
   * Storage keys.
   */
  private keys = {
    settings: 'settings',
    accessToken: 'accessToken',
    user: 'user',
    activityFeed: 'activityFeed',
  };

  /**
   * Storage data in storage.
   */
  async set(key: string, data: any): Promise<void> {
    const obj: { [key: string]: any } = {};

    obj[key] = data;

    await browser.storage.local.set(obj);
  }

  /**
   * Remove data from storage.
   */
  async remove(key: string): Promise<void> {
    await browser.storage.local.remove(key);
  }

  /**
   * Return data from storage or `null`
   */
  async get(key: string): Promise<any> {
    const data = await browser.storage.local.get(key);

    return data[key] || null;
  }

  //
  // SETTINGS
  //

  /**
   * Store settings.
   */
  setSettings(settings: AniListSearch.Settings): Promise<void> {
    return this.set(this.keys.settings, settings);
  }

  /**
   * Get settings from storage.
   */
  getSettings(): Promise<AniListSearch.Settings | null> {
    return this.get(this.keys.settings);
  }

  //
  // ACCESS TOKEN
  //

  /**
   * Store access token.
   */
  setAccessToken(accessToken: string): Promise<void> {
    return this.set(this.keys.accessToken, accessToken);
  }

  /**
   * Remove access token.
   */
  removeAccessToken(): Promise<void> {
    return this.remove(this.keys.accessToken);
  }

  /**
   * Get access token from storage.
   */
  getAccessToken(): Promise<string | null> {
    return this.get(this.keys.accessToken);
  }

  //
  // USER
  //

  /**
   * Store user.
   */
  setUser(user: AniListSearch.AniList.User): Promise<void> {
    return this.set(this.keys.user, user);
  }

  /**
   * Remove user.
   */
  removeUser(): Promise<void> {
    return this.remove(this.keys.user);
  }

  /**
   * Get user from storage.
   */
  getUser(): Promise<AniListSearch.AniList.User | null> {
    return this.get(this.keys.user);
  }

  //
  // ACTIVITY FEED
  //

  /**
   * Store activity feed.
   */
  setActivityFeed(activityFeed: AniListSearch.Activity.Activity[]): Promise<void> {
    return this.set(this.keys.activityFeed, activityFeed);
  }

  /**
   * Get activity feed from storage.
   */
  getActivityFeed(): Promise<AniListSearch.Activity.Activity[] | null> {
    return this.get(this.keys.activityFeed);
  }
}

export default new StorageHelper();
