import StorageHelper from '@/utils/StorageHelper';

/**
 * Clear activity feed.
 */
async function clearActivityFeed(sendResponse: Function) {
  try {
    await StorageHelper.setActivityFeed([]);
    sendResponse({ code: 'ACTIVITY_FEED_CLEAR_SUCCESS' });
  }
  catch (e) {
    sendResponse({ code: 'ACTIVITY_FEED_CLEAR_FAILED', message: e.message });
  }
}

/**
 * Save new activity in activity feed.
 */
async function saveActivity(newActivity: ALSearch.Activity.Activity, sendResponse: Function) {
  try {
    let activityFeed = await StorageHelper.getActivityFeed();

    if (!activityFeed) activityFeed = [];

    // Max activity size to 10.
    activityFeed.unshift(newActivity);
    activityFeed = activityFeed.slice(0, 10);

    // Store activity feed.
    await StorageHelper.setActivityFeed(activityFeed);

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
};
