import Helpers from '@/utils/Helpers';
import StorageHelper from '@/utils/StorageHelper';
import * as Enum from '@/utils/Enum';

class Settings {
  readonly defaultSettings: ALSearch.Settings = {
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
  };

  /**
   * Processes the given object and returns a valid Settings object.
   */
  private validate(input: any): ALSearch.Settings {
    if (!input || typeof input !== 'object') return Helpers.deepClone(this.defaultSettings);

    const validated = Helpers.deepClone(this.defaultSettings) as ALSearch.Settings;

    // Activity
    if (!Object.prototype.hasOwnProperty.call(input, 'activity')) {
      validated.activity = Helpers.deepClone(this.defaultSettings.activity);
    }
    else {
      if (
        !Object.prototype.hasOwnProperty.call(input.activity, 'search')
        || typeof input.activity.search !== 'boolean'
      ) {
        validated.activity.search = this.defaultSettings.activity.search;
      }
      else {
        validated.activity.search = input.activity.search;
      }

      if (
        !Object.prototype.hasOwnProperty.call(input.activity, 'visitedPages')
        || typeof input.activity.visitedPages !== 'boolean'
      ) {
        validated.activity.visitedPages = this.defaultSettings.activity.visitedPages;
      }
      else {
        validated.activity.visitedPages = input.activity.visitedPages;
      }
    }

    // Integration
    if (!Object.prototype.hasOwnProperty.call(input, 'integration')) {
      validated.integration = Helpers.deepClone(this.defaultSettings.integration);
    }
    else {
      if (
        !Object.prototype.hasOwnProperty.call(input.integration, 'webEnabled')
        || typeof input.integration.webEnabled !== 'boolean'
      ) {
        validated.integration.webEnabled = this.defaultSettings.integration.webEnabled;
      }
      else {
        validated.integration.webEnabled = input.integration.webEnabled;
      }

      if (
        !Object.prototype.hasOwnProperty.call(input.integration, 'menusEnabled')
        || typeof input.integration.menusEnabled !== 'boolean'
      ) {
        validated.integration.menusEnabled = this.defaultSettings.integration.menusEnabled;
      }
      else {
        validated.integration.menusEnabled = input.integration.menusEnabled;
      }
    }

    // Search
    if (!Object.prototype.hasOwnProperty.call(input, 'search')) {
      validated.integration = Helpers.deepClone(this.defaultSettings.search);
    }
    else if (
      !Object.prototype.hasOwnProperty.call(input.search, 'onListFirst')
      || typeof input.search.onListFirst !== 'boolean'
    ) {
      validated.search.onListFirst = this.defaultSettings.search.onListFirst;
    }
    else {
      validated.search.onListFirst = input.search.onListFirst;
    }

    // Theme
    if (
      !Object.prototype.hasOwnProperty.call(input, 'search')
      || !Object.values(Enum.Theme).includes(input.theme)
    ) {
      validated.theme = this.defaultSettings.theme;
    }
    else {
      validated.theme = input.theme;
    }

    // Return validated settings object.
    return validated as ALSearch.Settings;
  }

  /**
   * Init settings in storage.
   */
  private async initSettings(): Promise<ALSearch.Settings> {
    await StorageHelper.setSettings(this.defaultSettings);

    return Helpers.deepClone(this.defaultSettings);
  }

  /**
   * Get settings from storage.
   */
  async getSettings(): Promise<ALSearch.Settings> {
    let settings = await StorageHelper.getSettings();

    // If settings is not in storage, create it.
    if (!settings) return this.initSettings();

    // Else, validate settings object.
    settings = this.validate(settings);
    await StorageHelper.setSettings(settings);

    // All good, return the object.
    return settings;
  }

  /**
   * Update storage settings.
   */
  async updateSettings(settings: ALSearch.Settings): Promise<void> {
    await StorageHelper.setSettings(this.validate(settings));
  }
}

export default new Settings();
