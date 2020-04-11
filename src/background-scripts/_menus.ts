import StorageHelper from '@/utils/StorageHelper';

const browser = require('webextension-polyfill'); // eslint-disable-line

/**
 * Either add or remove contextual menus.
 *
 * @param show Show or hide menus.
 */
export function toggle(show = true) {
  if (show) {
    // Add contextual menus to quick search selected text on AniList.
    browser.contextMenus.create({
      id: 'AniListSearch__Anime',
      type: 'normal',
      title: 'AniList anime search for "%s"',
      contexts: ['selection'],
    });
    browser.contextMenus.create({
      id: 'AniListSearch__Manga',
      type: 'normal',
      title: 'AniList manga search for "%s"',
      contexts: ['selection'],
    });
    browser.contextMenus.create({
      id: 'AniListSearch__Studios',
      type: 'normal',
      title: 'AniList studios search for "%s"',
      contexts: ['selection'],
    });
    browser.contextMenus.create({
      id: 'AniListSearch__Characters',
      type: 'normal',
      title: 'AniList characters search for "%s"',
      contexts: ['selection'],
    });
    browser.contextMenus.create({
      id: 'AniListSearch__Staff',
      type: 'normal',
      title: 'AniList staff search for "%s"',
      contexts: ['selection'],
    });
  }
  else {
    browser.contextMenus.remove('AniListSearch__Anime');
    browser.contextMenus.remove('AniListSearch__Manga');
    browser.contextMenus.remove('AniListSearch__Studios');
    browser.contextMenus.remove('AniListSearch__Characters');
    browser.contextMenus.remove('AniListSearch__Staff');
  }
}

export async function init() {
  // Menus handlers.
  browser.contextMenus.onClicked.addListener((info: any) => {
    const value = info.selectionText;
    let url = `?sort=SEARCH_MATCH&search=${value}`;

    switch (info.menuItemId) {
      case 'AniListSearch__Anime':
        url = `${process.env.VUE_APP_ANILIST_ANIME_URL}${url}`;
        break;

      case 'AniListSearch__Manga':
        url = `${process.env.VUE_APP_ANILIST_MANGA_URL}${url}`;
        break;

      case 'AniListSearch__Studios':
        url = `${process.env.VUE_APP_ANILIST_STUDIOS_URL}${url}`;
        break;

      case 'AniListSearch__Characters':
        url = `${process.env.VUE_APP_ANILIST_CHARACTERS_URL}${url}`;
        break;

      case 'AniListSearch__Staff':
        url = `${process.env.VUE_APP_ANILIST_STAFF_URL}${url}`;
        break;

      default:
        break;
    }

    // Open AniList search page.
    browser.tabs.create({ url });
  });

  // Add contextual menus.
  const settings = await StorageHelper.getSettings();

  toggle(!settings || settings.integration.menusEnabled);
}
