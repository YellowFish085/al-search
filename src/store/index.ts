import Notifications from '@/utils/Notifications';
import StorageHelper from '@/utils/StorageHelper';
import Vue from 'vue';
import Vuex from 'vuex';
import * as Enum from '@/utils/Enum';

const browser = require("webextension-polyfill"); // eslint-disable-line

Vue.use(Vuex);

/**
 * Default storage state.
 */
const defaultState: AniListSearch.Store.State = {
  initialized: false,
  critError: null,
  settings: {
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
  },
  accessToken: null,
  user: null,
  activityFeed: null,
  search: null,
  searchResults: null,
};

export default new Vuex.Store({
  state: defaultState,
  mutations: {
    init(state: AniListSearch.Store.State, storeData: AniListSearch.Store.State): void {
      state.initialized = storeData.initialized;
      state.critError = null;
      state.settings = JSON.parse(JSON.stringify(storeData.settings));
      state.accessToken = storeData.accessToken;
      state.user = JSON.parse(JSON.stringify(storeData.user));
      state.activityFeed = JSON.parse(JSON.stringify(storeData.activityFeed));
      state.search = null;
      state.searchResults = null;
    },

    error(state: AniListSearch.Store.State, error: Error): void {
      console.error(error);
      state.critError = error;
    },

    /**
     * Update user data.
     */
    setUserData(
      state: AniListSearch.Store.State,
      data: { accessToken: string | null; user: AniListSearch.AniList.User | null },
    ): void {
      state.accessToken = data.accessToken;
      state.user = JSON.parse(JSON.stringify(data.user));
    },

    /**
     * Update settings.
     */
    setSettings(state: AniListSearch.Store.State, settings: AniListSearch.Settings): void {
      state.settings = JSON.parse(JSON.stringify(settings));
    },

    /**
     * Update activity feed.
     */
    setActivityFeed(
      state: AniListSearch.Store.State,
      activityFeed: AniListSearch.Activity.Activity[] | null,
    ): void {
      state.activityFeed = activityFeed;
    },

    /**
     * Update search data.
     */
    setSearch(state: AniListSearch.Store.State, search: AniListSearch.Search.Search | null): void {
      state.search = JSON.parse(JSON.stringify(search));
    },

    /**
     * Update search results.
     */
    setSearchResults(
      state: AniListSearch.Store.State,
      data: AniListSearch.Store.SearchResults | null,
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
        let settings = await StorageHelper.getSettings();
        const [accessToken, user, activityFeed] = await Promise.all([
          StorageHelper.getAccessToken(),
          StorageHelper.getUser(),
          StorageHelper.getActivityFeed(),
        ]);

        // Init settings are not yet stored in storage, save them.
        // This should be done by the background script, but just in case.
        if (!settings) {
          settings = JSON.parse(JSON.stringify(state.settings)) as AniListSearch.Settings;

          await StorageHelper.setSettings(settings);
        }

        // If user exists, check token usability in case token is not usable.
        if (user) {
          const response = await browser.runtime.sendMessage({ code: 'USER_REFRESH' });

          if (response.code === 'USER_REFRESH_FAILED') {
            Notifications.create(
              'auth_failed',
              'We couldn\'t get your account information, your token might be invalid. Please login again.',
            );
          }
        }

        // Create state.
        const newState: AniListSearch.Store.State = {
          initialized: true,
          settings,
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
    async updateSettings({ commit }, settings: AniListSearch.Settings): Promise<void> {
      try {
        // Store new settings in storage.
        await StorageHelper.setSettings(settings);

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
    searchFromActivity({ commit }, data: AniListSearch.Activity.Activity): void {
      const search: AniListSearch.Search.Search = {
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
    searchResults({ commit }, data: AniListSearch.Store.SearchResults | null): void {
      commit('setSearchResults', data);
    },
  },
  modules: {},
});
