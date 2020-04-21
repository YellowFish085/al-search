import Notifications from '@/utils/Notifications';
import Settings from '@/utils/Settings';
import StorageHelper from '@/utils/StorageHelper';
import Vue from 'vue';
import Vuex from 'vuex';

const browser = require("webextension-polyfill"); // eslint-disable-line

Vue.use(Vuex);

/**
 * Default storage state.
 */
const defaultState: ALSearch.Store.State = {
  initialized: false,
  critError: null,
  settings: JSON.parse(JSON.stringify(Settings.defaultSettings)),
  accessToken: null,
  user: null,
  activityFeed: null,
  search: null,
  searchResults: null,
};

export default new Vuex.Store({
  state: defaultState,
  mutations: {
    init(state: ALSearch.Store.State, storeData: ALSearch.Store.State): void {
      state.initialized = storeData.initialized;
      state.critError = null;
      state.settings = JSON.parse(JSON.stringify(storeData.settings));
      state.accessToken = storeData.accessToken;
      state.user = JSON.parse(JSON.stringify(storeData.user));
      state.activityFeed = JSON.parse(JSON.stringify(storeData.activityFeed));
      state.search = null;
      state.searchResults = null;
    },

    error(state: ALSearch.Store.State, error: Error): void {
      console.error(error);
      state.critError = error;
    },

    /**
     * Update user data.
     */
    setUserData(
      state: ALSearch.Store.State,
      data: { accessToken: string | null; user: ALSearch.AniList.User | null },
    ): void {
      state.accessToken = data.accessToken;
      state.user = JSON.parse(JSON.stringify(data.user));
    },

    /**
     * Update settings.
     */
    setSettings(state: ALSearch.Store.State, settings: ALSearch.Settings): void {
      state.settings = JSON.parse(JSON.stringify(settings));
    },

    /**
     * Update activity feed.
     */
    setActivityFeed(
      state: ALSearch.Store.State,
      activityFeed: ALSearch.Activity.Activity[] | null,
    ): void {
      state.activityFeed = activityFeed;
    },

    /**
     * Update search data.
     */
    setSearch(state: ALSearch.Store.State, search: ALSearch.Search.Search | null): void {
      state.search = JSON.parse(JSON.stringify(search));
    },

    /**
     * Update search results.
     */
    setSearchResults(
      state: ALSearch.Store.State,
      data: ALSearch.Store.SearchResults | null,
    ): void {
      state.searchResults = data;
    },
  },
  actions: {
    /**
     * Initialize state with data from storage.
     */
    async init({ state, commit }): Promise<void> {
      try {
        const [settings, accessToken, user, activityFeed] = await Promise.all([
          Settings.getSettings(),
          StorageHelper.getAccessToken(),
          StorageHelper.getUser(),
          StorageHelper.getActivityFeed(),
        ]);

        // If user exists, check token usability in case token is not usable.
        if (user) {
          // As the check is only meant to display a notification to the user,
          // we don't have to wait for the asynchronous method to finish to
          // allow the rest of the method to continue.
          browser.runtime.sendMessage({ code: 'USER_REFRESH' })
            .then((response: any) => {
              if (response.code === 'USER_REFRESH_FAILED') {
                Notifications.create('auth_failed', browser.i18n.getMessage('E_UserRefreshFailed'));
              }
            });
        }

        // Create state.
        const newState: ALSearch.Store.State = {
          initialized: true,
          settings: settings as ALSearch.Settings,
          critError: null,
          accessToken,
          user,
          activityFeed,
          search: null,
          searchResults: null,
        };

        commit('init', newState);
      }
      catch (e) {
        commit('error', e);
      }
    },

    /**
     * Refresh user data.
     */
    async refreshUserData({ commit }): Promise<void> {
      try {
        const [accessToken, user] = await Promise.all([
          StorageHelper.getAccessToken(),
          StorageHelper.getUser(),
        ]);

        commit('setUserData', { accessToken, user });
      }
      catch (e) {
        commit('error', e);
      }
    },

    /**
     * Logout user.
     */
    logout({ commit }): void {
      commit('setUserData', { accessToken: null, user: null });
    },

    /**
     * Update settings.
     */
    async updateSettings({ commit }, settings: ALSearch.Settings): Promise<void> {
      try {
        // Store new settings in storage.
        await Settings.updateSettings(settings);

        // Commit update to store.
        commit('setSettings', settings);
      }
      catch (e) {
        commit('error', e);
      }
    },

    /**
     * Clear activity.
     */
    clearActivityFeed({ commit }): void {
      commit('setActivityFeed', null);
    },

    /**
     * Refresh activity feed.
     */
    async refreshActivityFeed({ commit }): Promise<void> {
      try {
        const activityFeed = await StorageHelper.getActivityFeed();

        commit('setActivityFeed', activityFeed);
      }
      catch (e) {
        commit('error', e);
      }
    },

    /**
     * Start search from an activity item.
     */
    searchFromActivity({ commit }, data: ALSearch.Activity.Activity): void {
      const search: ALSearch.Search.Search = {
        value: data.value as string,
        type: data.params!.type,
        year: data.params!.year,
        season: data.params!.season,
      };

      commit('setSearch', search);
    },

    /**
     * Search results.
     */
    searchResults({ commit }, data: ALSearch.Store.SearchResults | null): void {
      commit('setSearchResults', data);
    },
  },
  modules: {},
});
