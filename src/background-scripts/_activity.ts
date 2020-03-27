const browser = require('webextension-polyfill'); // eslint-disable-line

/**
 * Clear activity feed.
 */
async function clearActivityFeed(sendResponse: Function) {
  try {
    await browser.storage.Local.set({ activityFeed: [] });
    sendResponse({ code: 'ACTIVITY_FEED_CLEAR_SUCCESS' });
  }
  catch (e) {
    sendResponse({ code: 'ACTIVITY_FEED_CLEAR_FAILED', message: e.message });
  }
}

/**
 * Save new activity in activity feed.
 */
async function saveActivity(newActivity: AniSearch.Activity.Activity, sendResponse: Function) {
  try {
    const storageActivityFeed = await browser.storage.local.get('activityFeed');

    let activityFeed = storageActivityFeed.activityFeed && Array.isArray(storageActivityFeed.activityFeed)
      ? storageActivityFeed.activityFeed
      : [];

    // Max activity size to 10.
    activityFeed.unshift(newActivity);
    activityFeed = activityFeed.slice(0, 10);

    // Store activity.
    await browser.storage.local.set({ activityFeed });

    sendResponse({ code: 'SAVE_ACTIVITY_SUCCESS' });
  }
  catch (e) {
    sendResponse({
      code: 'SAVE_ACTIVITY_FAILED',
      message: e.message,
    });
  }
}

export default {
  clearActivityFeed,
  saveActivity,
}
