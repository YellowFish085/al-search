if (!('browser' in self)) {
  self.browser = self.chrome;
}

export default class Storage {
  /**
   * Storage keys.
   */
  static KEYS = {
    SETTINGS:      'settings',
    ACCESS_TOKEN:  'accessToken',
    USER:          'user',
    ACTIVITY_FEED: 'activityFeed',
  };

  /**
   * Storage data in storage.
   */
  static async set(key, data) {
    const obj = {};

    obj[key] = data;

    await browser.storage.local.set(obj);
  }

  /**
   * Remove data from storage.
   */
  static async remove(key) {
    await browser.storage.local.remove(key);
  }

  /**
   * Return data from storage or `null`
   */
  static async get(key) {
    const data = await browser.storage.local.get(key);

    return data[key] || null;
  }
}