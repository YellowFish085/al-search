import Storage from './utils/storage.js';

export default class Activity {
  /**
   * Clear activity feed.
   */
  static async clear() {
    return Storage.set(Storage.KEYS.ACTIVITY_FEED, []);
  }

  /**
   * Get activity feed.
   */
  static async get() {
    return Storage.get(Storage.KEYS.ACTIVITY_FEED);
  }

  /**
   * Save new activity in activity feed.
   */
  static async store(activity) {
    let activityFeed = await this.get();

    if (!activityFeed) activityFeed = [];

    activityFeed.unshift(activity);

    // Max activity size to 10.
    activityFeed = activityFeed.slice(0, 10);

    // Store activity feed.
    return Storage.set(Storage.KEYS.ACTIVITY_FEED, activityFeed);
  }
}
