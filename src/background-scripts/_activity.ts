const browser = require('webextension-polyfill'); // eslint-disable-line

/**
 * Clear activity feed.
 */
async function clearActivity(sendResponse: Function) {
  try {
    await browser.storage.Local.set({ activity: [] });
    sendResponse({ code: 'ACTIVITY_CLEAR_SUCCESS' });
  }
  catch (e) {
    sendResponse({ code: 'ACTIVITY_CLEAR_FAILED', message: e.message });
  }
}

/**
 * Save new activity in activity feed.
 */
async function saveActivity(newActivity: AniSearch.Activity.Activity, sendResponse: Function) {
  try {
    const storageActivity = await browser.storage.local.get('activity');

    let activity = storageActivity.activity && Array.isArray(storageActivity.activity)
      ? storageActivity.activity
      : [];

    // Max activity size to 10.
    activity.unshift(newActivity);
    activity = activity.slice(0, 10);

    // Store activity.
    await browser.storage.local.set({ activity });

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
  clearActivity,
  saveActivity,
}
