/**
 * Theme choices.
 */
export enum Theme {
  DEFAULT = 'theme-default',
  DARK = 'theme-dark',
  CONTRAST = 'theme-contrast',
}

/**
 * Search types.
 */
export enum SearchType {
  ANIME = 'ANIME',
  MANGA = 'MANGA',
  STUDIOS = 'STUDIOS',
  CHARACTERS = 'CHARACTERS',
  STAFF = 'STAFF',
}

/**
 * Search seasons.
 */
export enum SearchSeason {
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  FALL = 'FALL',
  WINTER = 'WINTER',
}

/**
 * Activity Types.
 */
export enum ActivityType {
  SEARCH = 'SEARCH',
  VISITED_PAGE = 'VISITED_PAGE',
}

/**
 * Key in AniList search response that contains search results.
 */
export enum ResponseTypeKeys {
  ANIME = 'media',
  MANGA = 'media',
  STUDIOS = 'studios',
  CHARACTERS = 'characters',
  STAFF = 'staff',
}

/**
 * Media format.
 */
export enum Format {
  MANGA = 'MANGA',
  MOVIE = 'MOVIE',
  MUSIC = 'MUSIC',
  NOVEL = 'NOVEL',
  ONA = 'ONA',
  ONE_SHOT = 'ONE_SHOT',
  OVA = 'OVA',
  SPECIAL = 'SPECIAL',
  TV = 'TV',
  TV_SHORT = 'TV_SHORT',
}

/**
 * Media status.
 */
export enum Status {
  CANCELED = 'CANCELED',
  FINISHED = 'FINISHED',
  NOT_YET_RELEASED = 'NOT_YET_RELEASED',
  RELEASING = 'RELEASING',
}

/**
 * Web integration button X position.
 */
export enum WebIntegrationX {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

/**
 * Web integration button Y position.
 */
export enum WebIntegrationY {
  TOP = 'TOP',
  CENTER = 'CENTER',
  BOTTOM = 'BOTTOM',
}
