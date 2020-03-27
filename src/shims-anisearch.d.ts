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
    webEnabled: boolean;
    menusEnabled: boolean;
  };
}

/**
 * Store.
 */
export namespace Store {
  export interface SearchResults {
    type: Enum.SearchType;
    results: AniSearch.Search.Results;
    resultsOnList?: AniSearch.Search.Results;
  }

  /**
   * Store state.
   */
  export interface State {
    initialized: boolean;
    critError: Error | null;
    settings: Settings;
    accessToken: string | null;
    user: AniSearch.AniList.User | null;
    activityFeed: AniSearch.Activity.Activity[] | null;
    search: AniSearch.Search.Search | null;
    searchResults: AniSearch.Store.SearchResults | null;
  }
}

/**
 * AniList.
 */
export namespace AniList {
  /**
   * Media schema (anime & manga).
   */
  export interface Media {
    id: number;
    isAdult: boolean;
    type: string;
    title: {
      userPreferred: string;
    };
    description: string | null;
    banneImage: string | null;
    coverImage: {
      large: string | null;
      color: string | null;
    };
    startDate: {
      year: number | null;
      month: number | null;
      day: number | null;
    };
    endDate: {
      year: number | null;
      month: number | null;
      day: number | null;
    };
    season: Enum.SearchSeason;
    format: string | null;
    status: string | null;
    genres: string[];
    averageScore: number | null;
    popularity: number | null;
    nextAiringEpisode: {
      airingAt: number;
      timeUntilAiring: number;
      episode: number;
    } | null;
    studios: {
      edges: {
        isMain: boolean;
        node: {
          id: number;
          name: string;
        };
      }[];
    };
  }

  /**
   * Studio schema.
   */
  export interface Studio {
    id: number;
    name: string;
    media: {
      edges: {
        node: AniSearch.AniList.Media;
      }[];
    };
  }

  /**
   * Character schema.
   */
  export interface Character {
    id: number;
    name: {
      full: string;
    };
    image: {
      large: string | null;
    };
  }

  /**
   * Staff schema.
   */
  export interface Staff {
    id: number;
    name: {
      full: string;
    };
    image: {
      large: string | null;
    };
  }

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
    };
  }
}

/**
 * Search.
 */
export namespace Search {
  /**
   * Search options.
   */
  export interface Options {
    displayAdultContent: boolean;
  }

  /**
   * Search data.
   */
  export interface Search {
    value: string;
    type: Enum.SearchType;
    year?: number;
    season?: Enum.SearchSeason;
  }

  /**
   * Search results.
   */
  export type Results = AniSearch.AniList.Media[]
    | AniSearch.AniList.Studio[]
    | AniSearch.AniList.Character[]
    | AniSearch.AniList.Staff[];
}

/**
 * Activity.
 */
export namespace Activity {
  export interface Activity {
    type: Enum.ActivityType;
    label: string;
    value: string | number;
    params?: {
      type: Enum.SearchType;
      year?: number;
      season?: Enum.SearchSeason;
    };
  }
}
