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
      overlay: {
        inPage: false,
        x: Enum.WebIntegrationX.RIGHT,
        y: Enum.WebIntegrationY.BOTTOM,
      },
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

        if (Object.values(Enum.WebIntegrationX).includes(input.integration.overlay.x)) {
          validated.integration.overlay.x = input.integration.overlay.x;
        }

        if (Object.values(Enum.WebIntegrationY).includes(input.integration.overlay.y)) {
          validated.integration.overlay.y = input.integration.overlay.y;
        }
      }
    }

    // Search
    if (input.search && typeof input.search === 'object') {
      if (typeof input.search.onListFirst === 'boolean') {
        validated.search.onListFirst = input.search.onListFirst;
      }
    }

    // Theme
    if (Object.values(Enum.Theme).includes(input.theme)) {
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
