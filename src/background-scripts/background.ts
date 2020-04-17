import Activity from '@/background-scripts/_activity';
import Auth from '@/background-scripts/_auth';
import Notifications from '@/utils/Notifications';
import Search from '@/background-scripts/_search';
import StorageHelper from '@/utils/StorageHelper';
import * as Enum from '@/utils/Enum';
import * as Menus from '@/background-scripts/_menus';

const browser = require('webextension-polyfill'); // eslint-disable-line

function handleMessage(request: any, sender: any, sendResponse: Function) { // eslint-disable-line
  switch (request.code) {
    /**
     * Menus
     */

    case 'MENUS_TOGGLE':
      Menus.toggle(request.value);
      sendResponse({ code: 'SUCCESS' });
      break;

      /**
     * Auth
     */

    case 'AUTH_START':
      Auth.authStart(sendResponse);
      break;

    case 'USER_REFRESH':
      Auth.userRefresh(sendResponse);
      break;

    case 'USER_LOGOUT':
      Auth.userLogout(sendResponse);
      break;

      /**
     * Activity
     */

    case 'ACTIVITY_FEED_CLEAR':
      Activity.clearActivityFeed(sendResponse);
      break;

    case 'SAVE_ACTIVITY':
      Activity.saveActivity(request.data as AniSearch.Activity.Activity, sendResponse);
      break;

      /**
     * Search
     */

    case 'SEARCH':
      Search.search(request.data as AniSearch.Search.Search, sendResponse);
      break;

    default:
      sendResponse({ code: 'UNKNOWN_ACTION' });
      break;
  }

  // Keep listener active to wait for async response.
  return true;
}

browser.runtime.onMessage.addListener(handleMessage);

/**
 * Init webextension on browser startup.
 */
async function init() {
  try {
    // Init settings in storage if not yet present.
    if (!await StorageHelper.getSettings()) {
      const settings: AniSearch.Settings = {
        activity: {
          search: true,
          visitedPages: true,
        },
        integration: {
          webEnabled: true,
          menusEnabled: true,
        },
        search: {
          onListFirst: true,
        },
        theme: Enum.Theme.DEFAULT,
      };

      await StorageHelper.setSettings(settings);
    }
  }
  catch (e) {
    Notifications.create('init_failed', browser.i18n.getMessage('E_InitFailed', e.message));
  }

  // Init contextual menus.
  Menus.init();
}

init();
