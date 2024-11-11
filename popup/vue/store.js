const store = Vue.reactive({
  settings: null,

  user: null,

  // Activities.
  activities: [],

  // Search
  search: {
    season: '',
    type: Enum.SearchType.ANIME,
    q: '',
    year: '',
  },

  searchState: 'idle',

  searchResults: null,

  cardLayout: Enum.CardLayout.CHART,
});

// Fetch settings and user from storage on init.
browser.runtime.sendMessage({ code: 'SETTINGS' })
  .then((response) => {
    if (!response.error) {
      store.settings = response.settings;

      // Set popup theme.
      document.body.classList.add(store.settings.theme);
    }
    else {
      Notifications.create('settings', browser.i18n.getMessage('Error', response.error));
    }
  });

browser.runtime.sendMessage({ code: 'USER' })
  .then((response) => {
    if (!response.error) {
      store.user = response.user;
    }
    else {
      Notifications.create('user', browser.i18n.getMessage('Error', response.error));
    }
  });

browser.runtime.sendMessage({ code: 'ACTIVITIES' })
  .then((response) => {
    if (!response.error) {
      store.activities = response.activities ?? [];
    }
    else {
      Notifications.create('activities', browser.i18n.getMessage('Error', response.error));
    }
  });

// React to store changes.
Vue.watch(() => ({ ...store.settings }), (newSettings) => {
  // Set new theme.
  document.body.classList.remove(Enum.Theme.DEFAULT);
  document.body.classList.remove(Enum.Theme.DARK);
  document.body.classList.remove(Enum.Theme.CONTRAST);

  document.body.classList.add(newSettings.theme);
});

// On auth, fetch user.
document.addEventListener('auth', async (evt) => {
  const data = await browser.runtime.sendMessage({ code: 'USER' });

  if (!data.error) {
    store.user = data.user;

    Notifications.create('user', browser.i18n.getMessage('EVENT_Authenticated', store.user.name));
  }
  else {
    Notifications.create('user', browser.i18n.getMessage('Error', data.error));
  }
});

// On user refresh, fetch user.
document.addEventListener('refresh-user', async (evt) => {
  const data = await browser.runtime.sendMessage({ code: 'USER' });

  if (!data.error) {
    store.user = data.user;

    Notifications.create('user', browser.i18n.getMessage('EVENT_UserRefreshed'));
  }
  else {
    Notifications.create('user', browser.i18n.getMessage('Error', data.error));
  }
});

// On logout, clear user.
document.addEventListener('logout', async (evt) => {
  store.user = null;

  Notifications.create('user', browser.i18n.getMessage('EVENT_LoggedOut'));
});

// On activity feed cleared.
document.addEventListener('activity-feed-cleared', (evt) => {
  store.activities = [];

  Notifications.create('activity_feed', browser.i18n.getMessage('EVENT_ActivityCleared'));
})

// On search done...
document.addEventListener('search-done', (evt) => {
  // Refresh activity feed.
  browser.runtime.sendMessage({ code: 'ACTIVITIES' })
    .then((response) => {
      if (!response.error) {
        store.activities = response.activities;
      }
      else {
        Notifications.create('activities', browser.i18n.getMessage('Error', response.error));
      }
    });
})

// On page visited...
document.addEventListener('page-visited', (evt) => {
  // Refresh activity feed.
  browser.runtime.sendMessage({ code: 'ACTIVITIES' })
    .then((response) => {
      if (!response.error) {
        store.activities = response.activities;
      }
      else {
        Notifications.create('activities', browser.i18n.getMessage('Error', response.error));
      }
    });
})