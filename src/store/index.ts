import Vue from 'vue';
import Vuex from 'vuex';
import { UserSchema } from '@/anilist/graphql/user';

const browser = require("webextension-polyfill"); // eslint-disable-line

Vue.use(Vuex);

export interface StoreState {
  initialized: boolean;
  critError: Error|null;
  accessToken: string|null;
  user: UserSchema|null;
}

/**
 * Default storage state.
 */
const defaultState: StoreState = {
  initialized: false,
  critError: null,
  accessToken: null,
  user: null,
};

export default new Vuex.Store({
  state: defaultState,
  mutations: {
    init(state: StoreState, storeData: StoreState): void {
      state.initialized = storeData.initialized;
      state.critError = null;
      state.accessToken = storeData.accessToken;
      state.user = storeData.user === null ? null : { ...storeData.user };
    },

    error(state: StoreState, error: Error): void {
      console.error(error);
      state.critError = error;
    },

    /**
     * Authentication.
     */
    authenticated(state: StoreState, data: { accessToken: string; user: UserSchema }) {
      state.accessToken = data.accessToken;
      state.user = { ...data.user };
    },

    /**
     * Refresh user data.
     */
    refreshUserData(state: StoreState, user: UserSchema) {
      state.user = { ...user };
    },

    /**
     * Logout user.
     */
    logout(state: StoreState) {
      state.accessToken = null;
      state.user = null;
    },
  },
  actions: {
    /**
     * Initialize state with data from storage.
     */
    async init({ commit }): Promise<void> {
      try {
        const storageAccessToken = await browser.storage.local.get('accessToken');
        const storageUser = await browser.storage.local.get('user');

        // Create state.
        const newState: StoreState = {
          initialized: true,
          critError: null,
          // Will either be null if not defined, or string.
          accessToken: storageAccessToken.accessToken,
          // Will either be null if not defined, or object that implements UserSchema.
          user: storageUser.user === null ? null : storageUser.user as UserSchema,
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
  },
  modules: {},
});
