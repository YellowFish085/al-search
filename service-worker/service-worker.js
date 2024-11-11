import * as Enum from '../shared/enums-esm.js';
import Activity from './_activity.js';
import Auth from './_auth.js';
import ContextualMenu from './_contextual-menu.js';
import Search from './_search.js';
import Settings from './utils/settings.js';
import Storage from './utils/storage.js';

if (!('browser' in self)) {
  self.browser = self.chrome;
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.code) {
    //
    // Activity
    //

    case 'ACTIVITIES':
      Activity.get()
        .then((activities) => sendResponse({ activities: activities }))
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break

    case 'CLEAR_ACTIVITY_FEED':
      Activity.clear()
        .then(() => sendResponse({}))
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break;

    case 'STORE_ACTIVITY':
      Activity.store(request.data)
        .then(() => sendResponse({}))
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break;

    //
    // Auth
    //

    case 'USER':
      Storage.get(Storage.KEYS.USER)
        .then((user) => sendResponse({ user: user }))
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break;

    case 'AUTH':
      Auth.login()
        .then((user) => sendResponse({ user: user }))
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break;

    case 'REFRESH_USER':
      Auth.refresh()
        .then((user) => sendResponse({ user: user }))
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break;

    case 'LOGOUT':
      Auth.logout()
        .then(() => sendResponse({}))
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break;

    //
    // Search
    //

    case 'SEARCH':
      Search.search(request.data)
        .then((searchResult) => {
          Settings.get()
          .then((settings) => {
              // Store search activity if necessary.
              if (settings.activity.search) {
                Activity.store({
                  type:  Enum.ActivityType.SEARCH,
                  label: request.data.q,
                  value: request.data.q,
                  params: {
                    season: request.data.season,
                    type:   request.data.type,
                    year:   request.data.year,
                  }
                }).catch((e) => console.log(e));
              }

              sendResponse(searchResult);
            });
        })
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break;

    case 'SEARCH_SINGLE':
      Search.searchSingle(request.data)
        .then((searchResult) => sendResponse({ result: searchResult }))
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break;

    //
    // Settings
    //

    case 'SETTINGS':
      Settings.get()
        .then((settings) => sendResponse({ settings: settings }))
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break

    case 'STORE_SETTINGS':
      Settings.get()
        .then((oldSettings) => {
          Settings.set(request.settings)
            .then((settings) => {
              // Apply some changes depending on what changed.
              if (oldSettings.integration.menusEnabled !== settings.integration.menusEnabled) {
                ContextualMenu.toggle(settings.integration.menusEnabled);
              }

              sendResponse({ settings: settings });
            })
            .catch((e) => {
              console.log(e);
              sendResponse({ error: e.message });
            });
        })
        .catch((e) => {
          console.log(e);
          sendResponse({ error: e.message });
        });
      break

    default:
      sendResponse({ error: 'UNKNOWN_ACTION' });
      break;
  }

  // Keep listener active to wait for async response.
  return true;
});

/**
 * Init webextension on browser startup.
 */
async function init() {
  try {
    await Settings.get();
  }
  catch (e) {
    console.log(e);

    browser.notifications.create('init_failed', {
      type:   'basic',
      title:  'AL Search',
      iconUrl: browser.runtime.getURL('img/logo-128.png'),
      message: browser.i18n.getMessage('Error', e.message),
    });
  }

  // Init contextual menus.
  ContextualMenu.init();
}

init();
