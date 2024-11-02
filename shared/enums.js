/**
 * Activity Types.
 */
class EnumActivityType {
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
class EnumCardLayout {
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
 * Media format.
 */
class EnumFormat {
  static get MANGA() {
    return 'MANGA';
  }

  static get MOVIE() {
    return 'MOVIE';
  }

  static get MUSIC() {
    return 'MUSIC';
  }

  static get NOVEL() {
    return 'NOVEL';
  }

  static get ONA() {
    return 'ONA';
  }

  static get ONE_SHOT() {
    return 'ONE_SHOT';
  }

  static get OVA() {
    return 'OVA';
  }

  static get SPECIAL() {
    return 'SPECIAL';
  }

  static get TV() {
    return 'TV';
  }

  static get TV_SHORT() {
    return 'TV_SHORT';
  }
}

/**
 * Search seasons.
 */
class EnumSearchSeason {
  static get SPRING() {
    return 'SPRING';
  }

  static get SUMMER() {
    return 'SUMMER';
  }

  static get FALL() {
    return 'FALL';
  }

  static get WINTER() {
    return 'WINTER';
  }
}

/**
 * Search types.
 */
class EnumSearchType {
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
 * Media status.
 */
class EnumStatus {
  static get CANCELED() {
    return 'CANCELED';
  }

  static get FINISHED() {
    return 'FINISHED';
  }

  static get HIATUS() {
    return 'HIATUS';
  }

  static get NOT_YET_RELEASED() {
    return 'NOT_YET_RELEASED';
  }

  static get RELEASING() {
    return 'RELEASING';
  }
}

/**
 * Theme choices.
 */
class EnumTheme {
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
class EnumWebIntegrationX {
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
class EnumWebIntegrationY {
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

class Enum {
  static get ActivityType() {
    return EnumActivityType;
  }

  static get CardLayout() {
    return EnumCardLayout;
  }

  static get Format() {
    return EnumFormat;
  }

  static get SearchSeason() {
    return EnumSearchSeason;
  }

  static get SearchType() {
    return EnumSearchType;
  }

  static get Status() {
    return EnumStatus;
  }

  static get Theme() {
    return EnumTheme;
  }

  static get WebIntegrationX() {
    return EnumWebIntegrationX;
  }

  static get WebIntegrationY() {
    return EnumWebIntegrationY;
  }

}