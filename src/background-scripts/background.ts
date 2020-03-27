import Activity from '@/background-scripts/_activity';
import Auth from '@/background-scripts/_auth';
import Search from '@/background-scripts/_search';
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
      Search.search(request.data as AniSearch.Search.StoreSearch, sendResponse);
      break;

    default:
      sendResponse({ code: 'UNKNOWN_ACTION' });
      break;
  }

  // Keep listener active to wait for async response.
  return true;
}

browser.runtime.onMessage.addListener(handleMessage);

// Init contextual menus.
Menus.init();
