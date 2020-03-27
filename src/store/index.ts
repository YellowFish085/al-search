import * as Enum from '@/utils/Enum';
import Notifications from '@/utils/Notifications';
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
  },
  actions: {
    /**
     * Initialize state with data from storage.
     */
    async init({ state, commit }): Promise<void> {
      let storageSettings;
      let storageAccessToken;
      let storageUser;
      let storageActivityFeed;

      try {
        storageSettings = await browser.storage.local.get('settings');
        storageAccessToken = await browser.storage.local.get('accessToken');
        storageUser = await browser.storage.local.get('user');
        storageActivityFeed = await browser.storage.local.get('activityFeed');

        // Init settings are not yet stored in storage, save them.
        if (!storageSettings.settings) {
          const settings = JSON.parse(JSON.stringify(state.settings));
          storageSettings.settings = settings;

          await browser.storage.local.set({ settings });
        }

        // If user exists, check token usability in case token is not usable.
        if (storageUser.user) {
          const response = await browser.runtime.sendMessage({ code: 'USER_REFRESH' });

          if (response.code === 'USER_REFRESH_FAILED') {
            Notifications.create(
              'auth_failed',
              'We couldn\'t get your account information, your token might be invalid. Please login again.'
            );
          }
        }
      }
      catch (e) {
        commit('error', e);
      }

      // Create state.
      const newState: AniSearch.StoreState = {
        initialized: true,
        critError: null,
        settings: storageSettings.settings as AniSearch.Settings,
        // Will either be empty if not defined, or string.
        accessToken: storageAccessToken.accessToken,
        // Will either be empty if not defined, or object that implements UserSchema.
        user: storageUser.user ? storageUser.user as AniSearch.AniList.Schema.User : null,
        // Will either be empty if not defined, or array of string.
        activityFeed: storageActivityFeed.activityFeed
          ? storageActivityFeed.activityFeed as AniSearch.Activity.Activity[]
          : [],
        search: {
          type: Enum.SearchType.ANIME,
        },
      };

      commit('init', newState);
    },

    /**
     * Authentication.
     */
    async authenticated({ commit }): Promise<void> {
      let storageAccessToken;
      let storageUser;

      try {
        storageAccessToken = await browser.storage.local.get('accessToken');
        storageUser = await browser.storage.local.get('user');
      }
      catch (e) {
        commit('error', e);
      }

      commit('authenticated', {
        accessToken: storageAccessToken.accessToken,
        user: storageUser.user,
      });
    },

    /**
     * Refresh user data.
     */
    async refreshUserData({ commit }): Promise<void> {
      let storageUser;

      try {
        storageUser = await browser.storage.local.get('user');
      }
      catch (e) {
        commit('error', e);
      }

      commit('refreshUserData', storageUser.user);
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
        await browser.storage.local.set({ settings });
      }
      catch (e) {
        commit('error', e);
      }

      // Commit update to store.
      commit('updateSettings', settings);
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
      let storageActivityFeed;

      try {
        storageActivityFeed = await browser.storage.local.get('activityFeed');
      }
      catch (e) {
        commit('error', e);
      }

      if (storageActivityFeed.activityFeed && Array.isArray(storageActivityFeed.activityFeed)) {
        commit('refreshActivityFeed', storageActivityFeed.activityFeed);
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
  },
  modules: {},
});
