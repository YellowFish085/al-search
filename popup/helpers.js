class DotObject {
  /**
   * Get an object property using dot notation.
   */
  static get(obj, propPath) {
    const [head, ...rest] = propPath.split('.');

    return !rest.length
      ? obj[head]
      : this.get(obj[head], rest.join('.'));
  }

  /**
   * Update an object property using dot notation.
   */
  static set(obj, propPath, value) {
    const [head, ...rest] = propPath.split('.');

    !rest.length
      ? obj[head] = value
      : this.set(obj[head], rest.join('.'), value);
  }
};

class Color {
  static #defaultColors = {
    "--media-text": "hsl(202,57%,40%)",
    "--media-background": "hsl(202,57%,89%)",
    "--media-background-text": "hsl(202,57%,25%)",
    "--media-overlay-text": "hsl(202,80%,70%)"
  };

  static #colors = [
    {
      background: { r: 239, g: 92, b: 92 },
      text:       { r: 255, g: 244, b: 247 },
    },
    {
      background: { r: 253, g: 54, b: 78 },
      text:       { r: 255, g: 235, b: 235 },
    },
    {
      background: { r: 198, g: 34, b: 63 },
      text:       { r: 255, g: 241, b: 242 },
    },
    {
      background: { r: 250, g: 169, b: 202 },
      text:       { r: 107, g: 37, b: 66 },
    },
    {
      background: { r: 227, g: 79, b: 133 },
      text:       { r: 255, g: 226, b: 237 },
    },
    {
      background: { r: 205, g: 185, b: 241 },
      text:       { r: 60, g: 17, b: 121 },
    },
    {
      background: { r: 146, g: 98, b: 233 },
      text:       { r: 235, g: 222, b: 254 },
    },
    {
      background: { r: 118, g: 0, b: 204 },
      text:       { r: 224, g: 207, b: 255 },
    },
    {
      background: { r: 157, g: 185, b: 255 },
      text:       { r: 40, g: 42, b: 123 },
    },
    {
      background: { r: 78, g: 96, b: 182 },
      text:       { r: 222, g: 227, b: 255 },
    },
    {
      background: { r: 47, g: 54, b: 139 },
      text:       { r: 217, g: 228, b: 255 },
    },
    {
      background: { r: 190, g: 227, b: 249 },
      text:       { r: 39, g: 58, b: 75 },
    },
    {
      background: { r: 109, g: 200, b: 241 },
      text:       { r: 28, g: 74, b: 117 },
    },
    {
      background: { r: 54, g: 130, b: 234 },
      text:       { r: 242, g: 249, b: 253 },
    },
    {
      background: { r: 20, g: 64, b: 157 },
      text:       { r: 222, g: 240, b: 255 },
    },
    {
      background: { r: 118, g: 243, b: 233 },
      text:       { r: 27, g: 96, b: 109 },
    },
    {
      background: { r: 1, g: 196, b: 215 },
      text:       { r: 239, g: 253, b: 255 },
    },
    {
      background: { r: 25, g: 77, b: 113 },
      text:       { r: 211, g: 237, b: 252 },
    },
    {
      background: { r: 148, g: 255, b: 169 },
      text:       { r: 37, g: 100, b: 46 },
    },
    {
      background: { r: 155, g: 229, b: 61 },
      text:       { r: 37, g: 84, b: 20 },
    },
    {
      background: { r: 38, g: 127, b: 25 },
      text:       { r: 240, g: 248, b: 232 },
    },
    {
      background: { r: 255, g: 242, b: 126 },
      text:       { r: 174, g: 78, b: 24 },
    },
    {
      background: { r: 236, g: 182, b: 44 },
      text:       { r: 136, g: 43, b: 15 },
    },
    {
      background: { r: 136, g: 43, b: 15 },
      text:       { r: 254, g: 244, b: 196 },
    },
    {
      background: { r: 225, g: 214, b: 160 },
      text:       { r: 76, g: 64, b: 35 },
    },
    {
      background: { r: 242, g: 135, b: 13 },
      text:       { r: 94, g: 43, b: 12 },
    },
    {
      background: { r: 243, g: 84, b: 40 },
      text:       { r: 255, g: 232, b: 224 },
    },
  ];

  static #hexToRgb(hex) {
    let r = 0;
    let g = 0;
    let b = 0;

    if (hex.length == 3) {
      r = "0x" + hex[0] + hex[0];
      g = "0x" + hex[1] + hex[1];
      b = "0x" + hex[2] + hex[2];
    }
    else if (hex.length == 6) {
      r = "0x" + hex[0] + hex[1];
      g = "0x" + hex[2] + hex[3];
      b = "0x" + hex[4] + hex[5];
    }

    return [r, g, b];
  }

  static #rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values.
    let cmin  = Math.min(r, g, b);
    let cmax  = Math.max(r, g, b);
    let delta = cmax - cmin;
    let h     = 0;
    let s     = 0;
    let l     = 0;

    //
    // Calculate hue.
    //

    // No difference.
    if (delta == 0) {
      h = 0;
    }
    // Red is max.
    else if (cmax == r) {
      h = ((g - b) / delta) % 6;
    }
    // Green is max.
    else if (cmax == g) {
      h = (b - r) / delta + 2;
    }
    // Blue is max.
    else {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°.
    if (h < 0) {
      h += 360;
    }

    // Calculate lightness.
    l = (cmax + cmin) / 2;

    // Calculate saturation.
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100.
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
  }

  static mediaColors(color, dark = false) {
    if (!color) {
      return this.#defaultColors;
    }

    color = color.replace('#', '');

    // Try to get a base color in list from given color.
    const rgb     = Color.#hexToRgb(color);
    let baseColor = null;
    let t         = 1 / 0;

    this.#colors.forEach((c) => {
      const powed = Math.pow(rgb[0] - c.background.r, 2)
        + Math.pow(rgb[1] - c.background.g, 2)
        + Math.pow(rgb[2] - c.background.b, 2);

      if (powed < t) {
        t         = powed;
        baseColor = c;
      }
    });

    if (!baseColor) {
      return this.#defaultColors;
    }

    // Get all HSL colors.
    const i = this.#rgbToHsl(baseColor.background.r, baseColor.background.g, baseColor.background.b);
    const s = this.#rgbToHsl(baseColor.text.r, baseColor.text.g, baseColor.text.b);
    const r = i[2] > s[2] ? s : i;
    const n = [s[0], 80, 70];

    return {
      '--media-text': dark
        ? `hsl(${n[0]}, ${n[1]}%, ${n[2]}%)`
        : `hsl(${r[0]}, ${r[1]}%, ${r[2]}%)`,
      '--media-background': `hsl(${i[0]}, ${i[1]}%, ${i[2]}%)`,
      '--media-background-text': `hsl(${s[0]}, ${s[1]}%, ${s[2]}%)`,
      '--media-overlay-text': `hsl(${n[0]}, ${n[1]}%, ${n[2]}%)`,
    };
  }
};

class AnilistEntry {
  /**
   * Get media countdown string.
   */
  static countdown(entry, short = false) {
    const days  = Math.floor(entry.nextAiringEpisode.timeUntilAiring / (24 * 3600));
    const hours = Math.floor((entry.nextAiringEpisode.timeUntilAiring % (24 * 3600)) / 3600);
    const mins  = Math.floor((entry.nextAiringEpisode.timeUntilAiring % 3600) / 60);

    if (short) {
      return [
        days ?                    browser.i18n.getMessage(days === 1 ? 'AIRING_Day' : 'AIRING_Days', days.toString()) : null,
        !days && hours ?          browser.i18n.getMessage(hours === 1 ? 'AIRING_Hour' : 'AIRING_Hours', hours.toString()) : null,
        !days && !hours && mins ? browser.i18n.getMessage(mins === 1 ? 'AIRING_Min' : 'AIRING_Mins', mins.toString()) : null,
      ].filter(i => i).join(', ');
    }

    return [
      days ?          browser.i18n.getMessage(days === 1 ? 'AIRING_Day' : 'AIRING_Days', days.toString()) : null,
      hours ?         browser.i18n.getMessage(hours === 1 ? 'AIRING_Hour' : 'AIRING_Hours', hours.toString()) : null,
      !days && mins ? browser.i18n.getMessage(mins === 1 ? 'AIRING_Min' : 'AIRING_Mins', mins.toString()) : null,
    ].filter(i => i).join(', ');
  }

  /**
   * Get the date(s) string for media.
   */
  static dates(entry) {
    if (entry.startDate && entry.startDate.year) {
      if (entry.status === Enum.Status.RELEASING && entry.startDate.year !== (new Date).getFullYear()) {
        if (entry.type === Enum.SearchType.ANIME) {
          return browser.i18n.getMessage('AIRING_AiringSince', entry.startDate.year.toString());
        }
        else {
          return browser.i18n.getMessage('AIRING_PublishingSince', entry.startDate.year.toString());
        }
      }

      if (entry.endDate && entry.endDate.year && entry.endDate.year > entry.startDate.year + 1) {
        return `${entry.startDate.year} - ${entry.endDate.year}`;
      }

      if (entry.season) {
        return `${browser.i18n.getMessage(`ENUM_SEASON_${entry.season}`)} ${entry.seasonYear ?? entry.startDate.year}`;
      }

      return entry.startDate.year.toString();
    }

    if ([Enum.Status.CANCELED, Enum.Status.FINISHED].includes(entry.status)) {
      return browser.i18n.getMessage(`ENUM_STATUS_${entry.status}`);
    }

    return browser.i18n.getMessage('ENUM_STATUS_NOT_YET_RELEASED');
  }

  /**
   * Get media duration string.
   */
  static duration(entry) {
    if (entry.type === Enum.SearchType.ANIME) {
      if (entry.format === Enum.Format.MOVIE) {
        const duration = entry.duration;
        const hours    = Math.floor(duration / 60);
        const mins     = Math.floor(duration % 60);

        return [
          hours ? browser.i18n.getMessage(hours === 1 ? 'AIRING_Hour' : 'AIRING_Hours', hours.toString()) : null,
          mins  ? browser.i18n.getMessage(mins === 1 ? 'AIRING_Min' : 'AIRING_Mins', mins.toString()) : null,
        ].filter(i => i).join(', ');
      }

      if (entry.episodes) {
        return entry.episodes === 1
          ? browser.i18n.getMessage('AIRING_Episode', entry.episodes.toString())
          : browser.i18n.getMessage('AIRING_Episodes', entry.episodes.toString());
      }
    }

    if (entry.format === Enum.Format.NOVEL && entry.volumes) {
      return entry.volumes === 1
        ? browser.i18n.getMessage('AIRING_Volume', entry.volumes.toString())
        : browser.i18n.getMessage('AIRING_Volumes', entry.volumes.toString());
    }

    if (entry.chapters) {
      return entry.chapters === 1
        ? browser.i18n.getMessage('AIRING_Chapter', entry.chapters.toString())
        : browser.i18n.getMessage('AIRING_Chapters', entry.chapters.toString());
    }
  }

  /**
   * Go to entry page.
   */
  static goTo(store, entry) {
    // Store visited page activity.
    if (store.settings.activity.visitedPages) {
      let name = '';

      switch (store.search.type) {
        case Enum.SearchType.ANIME:
        case Enum.SearchType.MANGA:
          name = entry.title.userPreferred;
          break;

        case Enum.SearchType.STUDIOS:
          name = entry.name;
          break;

        case Enum.SearchType.CHARACTERS:
        case Enum.SearchType.STAFF:
          name = entry.name.full;
          break;
      }

      browser.runtime.sendMessage({
        code: 'STORE_ACTIVITY', data: {
          type:   Enum.ActivityType.VISITED_PAGE,
          label:  name,
          value:  name,
          params: {
            url:  entry.siteUrl,
            type: store.search.type,
          }
        }
      }).then(() => {
        document.dispatchEvent(new CustomEvent('page-visited'));

        // Go to page.
        window.open(entry.siteUrl);
      });
    }
    else {
      // Go to page.
      window.open(entry.siteUrl);
    }
  }

  /**
   * Get studio.
   */
  static studio(entry) {
    return entry.studios && entry.studios.edges[0]
      ? entry.studios.edges[0].node
      : null
  }
}

class Notifications {
  /**
   * Send browser notification.
   */
  static create(id, message) {
    browser.notifications.create(id, {
      type:    'basic',
      title:   'AL Search',
      iconUrl: browser.runtime.getURL('img/logo-128.png'),
      message: message,
    });
  }
};

/**
 * Deep clone object.
 */
const deepClone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}