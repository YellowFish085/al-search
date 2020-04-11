import * as Enum from '@/utils/Enum';

export as namespace AniListSearch;

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

  search: {
    onListFirst: boolean;
  };

  theme: Enum.Theme;
}

/**
 * Store.
 */
export namespace Store {
  export interface SearchResults {
    loading: boolean;
    type: Enum.SearchType;
    results?: AniListSearch.Search.Results;
    resultsOnList?: AniListSearch.Search.Results;
  }

  /**
   * Store state.
   */
  export interface State {
    initialized: boolean;
    critError: Error | null;
    settings: Settings;
    accessToken: string | null;
    user: AniListSearch.AniList.User | null;
    activityFeed: AniListSearch.Activity.Activity[] | null;
    search: AniListSearch.Search.Search | null;
    searchResults: AniListSearch.Store.SearchResults | null;
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
    siteUrl: string;
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
    season: Enum.SearchSeason | null;
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
    mediaListEntry: {
      id: number;
      status: string;
    } | null;
    studios?: {
      edges: {
        isMain: boolean;
        node: {
          id: number;
          name: string;
          siteUrl: string;
        };
      }[];
    };
  }

  /**
   * Studio schema.
   */
  export interface Studio {
    id: number;
    siteUrl: string;
    name: string;
    media: {
      edges: {
        node: AniListSearch.AniList.Media;
      }[];
    };
  }

  /**
   * Character schema.
   */
  export interface Character {
    id: number;
    siteUrl: string;
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
    siteUrl: string;
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
  }
}

/**
 * Search.
 */
export namespace Search {
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
  export type Results = AniListSearch.AniList.Media[]
    | AniListSearch.AniList.Studio[]
    | AniListSearch.AniList.Character[]
    | AniListSearch.AniList.Staff[];
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

/**
 * Github
 */
export namespace Github {
  export interface Release {
    tag_name: string;
    published_at: string;
    body: string;
  }
}
