/**
 * Activity Types.
 */
export class ActivityType {
  static get SEARCH() {
    return 'SEARCH';
  }

  static get VISITED_PAGE() {
    return 'VISITED_PAGE';
  }
}

/**
 * Card layout on search results pages.
 */
export class CardLayout {
  static get CHART() {
    return 'CHART';
  }

  static get COVER() {
    return 'COVER';
  }

  static get TABLE() {
    return 'TABLE';
  }
}

/**
 * Key in AniList search response that contains search results.
 */
export class ResponseTypeKeys {
  static get ANIME() {
    return 'media';
  }

  static get MANGA() {
    return 'media';
  }

  static get STUDIOS() {
    return 'studios';
  }

  static get CHARACTERS() {
    return 'characters';
  }

  static get STAFF() {
    return 'staff';
  }
}

/**
 * Search types.
 */
export class SearchType {
  static get ANIME() {
    return 'ANIME';
  }

  static get MANGA() {
    return 'MANGA';
  }

  static get STUDIOS() {
    return 'STUDIOS';
  }

  static get CHARACTERS() {
    return 'CHARACTERS';
  }

  static get STAFF() {
    return 'STAFF';
  }
}

/**
 * Theme choices.
 */
export class Theme {
  static get DEFAULT() {
    return 'theme-default';
  }

  static get DARK() {
    return 'theme-dark';
  }

  static get CONTRAST() {
    return 'theme-contrast';
  }
}

/**
 * Web integration button X position.
 */
export class WebIntegrationX {
  static get LEFT() {
    return 'LEFT';
  }

  static get RIGHT() {
    return 'RIGHT';
  }
}

/**
 * Web integration button Y position.
 */
export class WebIntegrationY {
  static get TOP() {
    return 'TOP';
  }

  static get CENTER() {
    return 'CENTER';
  }

  static get BOTTOM() {
    return 'BOTTOM';
  }
}
