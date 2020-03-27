import * as Enum from '@/utils/Enum';
import Notifications from '@/utils/Notifications';
import StorageHelper from '@/utils/StorageHelper';
import Vue from 'vue';
import Vuex from 'vuex';

const browser = require("webextension-polyfill"); // eslint-disable-line

Vue.use(Vuex);

/**
 * Default storage state.
 */
const defaultState: AniSearch.StoreState = {
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
  },
  accessToken: null,
  user: null,
  activityFeed: [],
  search: {
    type: Enum.SearchType.ANIME,
  },
};

export default new Vuex.Store({
  state: defaultState,
  mutations: {
    init(state: AniSearch.StoreState, storeData: AniSearch.StoreState): void {
      state.initialized = storeData.initialized;
      state.critError = null;
      state.settings = JSON.parse(JSON.stringify(storeData.settings));
      state.accessToken = storeData.accessToken;
      state.user = storeData.user ? JSON.parse(JSON.stringify(storeData.user)) : null;
      state.activityFeed = storeData.activityFeed;
    },

    error(state: AniSearch.StoreState, error: Error): void {
      console.error(error);
      state.critError = error;
    },

    /**
     * Authentication.
     */
    authenticated(
      state: AniSearch.StoreState,
      data: { accessToken: string; user: AniSearch.AniList.Schema.User },
    ): void {
      state.accessToken = data.accessToken;
      state.user = JSON.parse(JSON.stringify(data.user));
    },

    /**
     * Refresh user data.
     */
    refreshUserData(state: AniSearch.StoreState, user: AniSearch.AniList.Schema.User): void {
      state.user = JSON.parse(JSON.stringify(user));
    },

    /**
     * Logout user.
     */
    logout(state: AniSearch.StoreState): void {
      state.accessToken = null;
      state.user = null;
    },

    /**
     * Update settings.
     */
    updateSettings(state: AniSearch.StoreState, settings: AniSearch.Settings): void {
      state.settings = JSON.parse(JSON.stringify(settings));
    },

    /**
     * Clear activity feed.
     */
    clearActivityFeed(state: AniSearch.StoreState): void {
      state.activityFeed = [];
    },

    /**
     * Refresh activity feed.
     */
    refreshActivityFeed(
      state: AniSearch.StoreState,
      activityFeed: AniSearch.Activity.Activity[],
    ): void {
      state.activityFeed = activityFeed;
    },

    /**
     * Start search from an activity item.
     */
    updateSearch(state: AniSearch.StoreState, search: AniSearch.Search.StoreSearch): void {
      state.search = JSON.parse(JSON.stringify(search));
    },

    /**
     * Search results.
     */
    searchResults(state: AniSearch.StoreState, data: AniSearch.Search.StoreSearchResults): void {
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
        if (!settings) {
          settings = JSON.parse(JSON.stringify(state.settings)) as AniSearch.Settings;

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
        const newState: AniSearch.StoreState = {
          initialized: true,
          critError: null,
          settings,
          accessToken,
          user,
          activityFeed: activityFeed!,
          search: {
            type: Enum.SearchType.ANIME,
          },
        };

        commit('init', newState);
      }
      catch (e) {
        commit('error', e);
      }
    },

    /**
     * Authentication.
     */
    async authenticated({ commit }): Promise<void> {
      try {
        const [accessToken, user] = await Promise.all([
          StorageHelper.getAccessToken(),
          StorageHelper.getUser(),
        ]);

        commit('authenticated', {
          accessToken,
          user,
        });
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
        const user = await StorageHelper.getUser();

        commit('refreshUserData', user);
      }
      catch (e) {
        commit('error', e);
      }
    },

    /**
     * Logout user.
     */
    logout({ commit }): void {
      commit('logout');
    },

    /**
     * Update settings.
     */
    async updateSettings({ commit }, settings: AniSearch.Settings): Promise<void> {
      try {
        // Store new settings in storage.
        await StorageHelper.setSettings(settings);

        // Commit update to store.
        commit('updateSettings', settings);
      }
      catch (e) {
        commit('error', e);
      }
    },

    /**
     * Clear activity.
     */
    clearActivityFeed({ commit }): void {
      commit('clearActivityFeed');
    },

    /**
     * Refresh activity feed.
     */
    async refreshActivityFeed({ commit }): Promise<void> {
      try {
        const activityFeed = await StorageHelper.getActivityFeed();

        commit('refreshActivityFeed', activityFeed);
      }
      catch (e) {
        commit('error', e);
      }
    },

    /**
     * Start search from an activity item.
     */
    searchFromActivity({ commit }, data: AniSearch.Activity.Activity): void {
      const search: AniSearch.Search.StoreSearch = {
        value: data.value as string,
        type: data.params!.type,
        year: data.params!.year,
        season: data.params!.season,
      };

      commit('updateSearch', search);
    },

    /**
     * Search results.
     */
    searchResults({ commit }, data: AniSearch.Search.StoreSearchResults): void {
      commit('searchResults', data);
    },
  },
  modules: {},
});
