import * as Enum from '@/utils/Enum';

export as namespace ALSearch;

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
    overlay: ALSearch.WebIntegration.Overlay;
  };

  search: {
    onListFirst: boolean;
    layout: Enum.CardLayout;
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
    results?: ALSearch.Search.Results;
    resultsOnList?: ALSearch.Search.Results;
  }

  /**
   * Store state.
   */
  export interface State {
    initialized: boolean;
    critError: Error | null;
    settings: Settings;
    accessToken: string | null;
    user: ALSearch.AniList.User | null;
    activityFeed: ALSearch.Activity.Activity[] | null;
    search: ALSearch.Search.Search | null;
    searchResults: ALSearch.Store.SearchResults | null;
  }
}

/**
 * AniList.
 */
export namespace AniList {
  /**
   * A data from any type.
   */
  export type Data = ALSearch.AniList.Media
    | ALSearch.AniList.Studio
    | ALSearch.AniList.Character
    | ALSearch.AniList.Staff;

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
    format: Enum.Format | null;
    status: string | null;
    chapters: number | null;
    episodes: number | null;
    duration: number | null;
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
        node: ALSearch.AniList.Media;
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
  export type Results = ALSearch.AniList.Media[]
    | ALSearch.AniList.Studio[]
    | ALSearch.AniList.Character[]
    | ALSearch.AniList.Staff[];
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

/**
 * Web integration.
 */
export namespace WebIntegration {
  /**
   * Button position.
   */
  export interface Overlay {
    inPage: boolean;
    x: Enum.WebIntegrationX;
    y: Enum.WebIntegrationY;
  }

  /**
   * Button position override, same as ButtonPosition but with optional parameters.
   */
  export interface OverlayOverride {
    inPage?: boolean;
    x?: Enum.WebIntegrationX;
    y?: Enum.WebIntegrationY;
  }

  /**
   * Overlay parameters when a content script creates a button on a page.
   */
  export interface OverlayParameters {
    /**
     * CSS selector used to find the search value for the content.
     *
     * The code will look into the content of the corresponding node and use it to search on AniList.
     */
    selector: string;

    /**
     * CSS selector used to find the title displayed to the user.
     *
     * The code will look into the content of the corresponding node and use it as a display.
     *
     * If no value is provided, `selector` will be used instead.
     */
    selectorTitle?: string;

    /** Data type. */
    type?: Enum.SearchType;

    /**
     * Override method used to find the search value from the node corresponding to `selector`.
     *
     * By default, the code will use the `innerText` of the node.
     *
     * If a specific flow need to be executed for a page, provide this method.
     */
    getValue?: (node: HTMLElement) => string | null;

    /**
     * Override method used to find the title from the node corresponding to `selectorTitle`.
     *
     * By default, the code will use the `innerText` of the node.
     *
     * If a specific flow need to be executed for a page, provide this method.
     */
    getTitle?: (node: HTMLElement) => string | null;

    /**
     * Custom callback when the button is inserted in a node in the page and not as a fixed element.
     *
     * This method is only called when the user settings `inPage` is set to `true`.
     *
     * This method receives one parameter which is the button node.
     */
    appendInPage: (node: HTMLElement) => void;

    /**
     * Overrides button overlay settings.
     *
     * If a page needs the button to be placed in a specific way because it can't be placed any other
     * ways, use this object to override the user settings and force the button position.
     */
    overlayOverride?: ALSearch.WebIntegration.OverlayOverride;
  }
}
