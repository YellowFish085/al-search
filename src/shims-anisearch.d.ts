import * as Enum from '@/utils/Enum';

export as namespace AniSearch;

/**
 * App settings.
 */
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

/**
 * Store state.
 */
export interface StoreState {
  initialized: boolean;
  critError: Error | null;
  settings: Settings;
  accessToken: string | null;
  user: AniSearch.AniList.Schema.User | null;
  activity: AniSearch.Activity.Activity[];
}

/**
 * AniList.
 */
export namespace AniList {
  export namespace Schema {
    /**
     * User schema.
     */
    export interface User {
      id: number;
      name: string;
      avatar: {
        medium: string;
      };
      siteUrl: string;
      options: {
        displayAdultContent: boolean;
        titleLanguage: string;
      };
    }
  }
}

/**
 * Activity.
 */
export namespace Activity {
  export interface Activity {
    type: Enum.ActivityType;
    label: string;
    value: string | number;
  }
}
