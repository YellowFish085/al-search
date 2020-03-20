import Vue from 'vue';
import Vuex from 'vuex';
import { UserSchema } from '@/anilist/graphql/user';

const browser = require("webextension-polyfill"); // eslint-disable-line

Vue.use(Vuex);

export interface Settings {
  activity: {
    search: boolean;
    visitedPages: boolean;
  };

  integration: {
    enabled: boolean;
    toAnilist: boolean;
  };
}

export enum ActivityType {
  SEARCH,
  VISITED_PAGE,
}

export interface Activity {
  type: ActivityType;
  label: string;
  value: string|number;
}

export interface StoreState {
  initialized: boolean;
  critError: Error|null;
  settings: Settings;
  accessToken: string|null;
  user: UserSchema|null;
  activity: Activity[];
}

/**
 * Default storage state.
 */
const defaultState: StoreState = {
  initialized: false,
  critError: null,
  settings: {
    activity: {
      search: true,
      visitedPages: true,
    },
    integration: {
      enabled: true,
      toAnilist: false,
    },
  },
  accessToken: null,
  user: null,
  activity: [],
};

export default new Vuex.Store({
  state: defaultState,
  mutations: {
    init(state: StoreState, storeData: StoreState): void {
      state.initialized = storeData.initialized;
      state.critError = null;
      state.settings = { ...storeData.settings };
      state.accessToken = storeData.accessToken;
      state.user = storeData.user ? { ...storeData.user } : null;
      state.activity = storeData.activity;
    },

    error(state: StoreState, error: Error): void {
      console.error(error);
      state.critError = error;
    },

    /**
     * Authentication.
     */
    authenticated(state: StoreState, data: { accessToken: string; user: UserSchema }): void {
      state.accessToken = data.accessToken;
      state.user = { ...data.user };
    },

    /**
     * Refresh user data.
     */
    refreshUserData(state: StoreState, user: UserSchema): void {
      state.user = { ...user };
    },

    /**
     * Logout user.
     */
    logout(state: StoreState): void {
      state.accessToken = null;
      state.user = null;
    },

    /**
     * Update settings.
     */
    updateSettings(state: StoreState, settings: Settings): void {
      state.settings = { ...settings };
    },

    /**
     * Clear activity.
     */
    clearActivity(state: StoreState): void {
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
        const newState: StoreState = {
          initialized: true,
          critError: null,
          settings: storageSettings.settings as Settings,
          // Will either be empty if not defined, or string.
          accessToken: storageAccessToken.accessToken,
          // Will either be empty if not defined, or object that implements UserSchema.
          user: storageUser.user ? storageUser.user as UserSchema : null,
          // Will either be empty if not defined, or array of string.
          activity: storageActivity.activity ? storageActivity.activity as string[] : [],
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
    async updateSettings({ commit }, settings: Settings): Promise<void> {
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
