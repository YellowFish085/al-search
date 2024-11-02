import * as Enum from '../../shared/enums-esm.js';
import Helpers from './helpers.js';
import Storage from './storage.js';

export default class Settings {
  static #defaultSettings = Object.freeze({
    activity: {
      search:       true,
      visitedPages: true,
    },

    integration: {
      webEnabled:   true,
      menusEnabled: true,
      overlay:      {
        inPage: false,
        x:      Enum.WebIntegrationX.RIGHT,
        y:      Enum.WebIntegrationY.BOTTOM,
      },
    },

    search: {
      onListFirst: true,
      layout:      Enum.CardLayout.CHART,
    },

    theme: Enum.Theme.DEFAULT,
  });

  static #validate(input) {
    if (!input || typeof input !== 'object') {
      return Helpers.deepClone(this.#defaultSettings);
    }

    const validated = Helpers.deepClone(this.#defaultSettings);

    // Activity
    if (input.activity && typeof input.activity === 'object') {
      if (typeof input.activity.search === 'boolean') {
        validated.activity.search = input.activity.search;
      }

      if (typeof input.activity.visitedPages === 'boolean') {
        validated.activity.visitedPages = input.activity.visitedPages;
      }
    }

    // Integration
    if (input.integration && typeof input.integration === 'object') {
      if (typeof input.integration.webEnabled === 'boolean') {
        validated.integration.webEnabled = input.integration.webEnabled;
      }

      if (typeof input.integration.menusEnabled === 'boolean') {
        validated.integration.menusEnabled = input.integration.menusEnabled;
      }

      if (input.integration.overlay && typeof input.integration.overlay === 'object') {
        if (typeof input.integration.overlay.inPage === 'boolean') {
          validated.integration.overlay.inPage = input.integration.overlay.inPage;
        }

        if ([Enum.WebIntegrationX.LEFT, Enum.WebIntegrationX.RIGHT].includes(input.integration.overlay.x)) {
          validated.integration.overlay.x = input.integration.overlay.x;
        }

        if ([Enum.WebIntegrationY.BOTTOM, Enum.WebIntegrationY.CENTER, Enum.WebIntegrationY.TOP].includes(input.integration.overlay.y)) {
          validated.integration.overlay.y = input.integration.overlay.y;
        }
      }
    }

    // Search
    if (input.search && typeof input.search === 'object') {
      if (typeof input.search.onListFirst === 'boolean') {
        validated.search.onListFirst = input.search.onListFirst;
      }

      if ([Enum.CardLayout.CHART, Enum.CardLayout.COVER, Enum.CardLayout.TABLE].includes(input.search.layout)) {
        validated.search.layout = input.search.layout;
      }
    }

    // Theme
    if ([Enum.Theme.CONTRAST, Enum.Theme.DARK, Enum.Theme.DEFAULT].includes(input.theme)) {
      validated.theme = input.theme;
    }

    // Return validated settings object.
    return validated;
  }

  /**
   * Init settings in storage.
   */
  static async #initSettings() {
    await Storage.set(Storage.KEYS.SETTINGS, this.#defaultSettings);

    return Helpers.deepClone(this.#defaultSettings);
  }

  /**
   * Get settings from storage.
   */
  static async get() {
    let settings = await Storage.get(Storage.KEYS.SETTINGS);

    if (!settings) {
      return this.#initSettings();
    }

    // We do a set for security, just in case current storage settings are invalid.
    return this.set(settings);
  }

  /**
   * Set settings to storage.
   */
  static async set(settings) {
    await Storage.set(Storage.KEYS.SETTINGS, this.#validate(settings));

    return Storage.get(Storage.KEYS.SETTINGS);
  }
}