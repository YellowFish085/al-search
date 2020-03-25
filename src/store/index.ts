import * as Enum from '@/utils/Enum';
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
  activity: [],
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
      state.activity = storeData.activity;
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
     * Clear activity.
     */
    clearActivity(state: AniSearch.StoreState): void {
      state.activity = [];
    },
  },
  actions: {
    /**
     * Initialize state with data from storage.
     */
    async init({ state, commit }): Promise<void> {
      try {
        const storageSettings = await browser.storage.local.get('settings');
        const storageAccessToken = await browser.storage.local.get('accessToken');
        const storageUser = await browser.storage.local.get('user');
        const storageActivity = await browser.storage.local.get('activity');

        // Init settings are not yet stored in storage, save them.
        if (!storageSettings.settings) {
          const settings = JSON.parse(JSON.stringify(state.settings));
          storageSettings.settings = settings;

          await browser.storage.local.set({ settings });
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
          activity: storageActivity.activity
            ? storageActivity.activity as AniSearch.Activity.Activity[]
            : [],
        };

        commit('init', newState);
      } catch (e) {
        commit('error', e);
      }
    },

    /**
     * Authentication.
     */
    async authenticated({ commit }): Promise<void> {
      try {
        const stoAccessToken = await browser.storage.local.get('accessToken');
        const stoUser = await browser.storage.local.get('user');

        commit('authenticated', {
          accessToken: stoAccessToken.accessToken,
          user: stoUser.user,
        });
      } catch (e) {
        commit('error', e);
      }
    },

    /**
     * Refresh user data.
     */
    async refreshUserData({ commit }): Promise<void> {
      try {
        const stoUser = await browser.storage.local.get('user');

        commit('refreshUserData', stoUser.user);
      } catch (e) {
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
      console.log(settings);

      try {
        // Store new settings in storage.
        await browser.storage.local.set({ settings });

        console.log(await browser.storage.local.get('settings'));

        // Commit update to store.
        commit('updateSettings', settings);
      } catch (e) {
        commit('error', e);
      }
    },

    /**
     * Clear activity.
     */
    clearActivity({ commit }): void {
      commit('clearActivity');
    },
  },
  modules: {},
});
