import Settings from '@/utils/Settings';

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
      id: 'AL-Search__Anime',
      type: 'normal',
      title: browser.i18n.getMessage('MENUS_SearchAnime'),
      contexts: ['selection'],
    });
    browser.contextMenus.create({
      id: 'AL-Search__Manga',
      type: 'normal',
      title: browser.i18n.getMessage('MENUS_SearchManga'),
      contexts: ['selection'],
    });
    browser.contextMenus.create({
      id: 'AL-Search__Studios',
      type: 'normal',
      title: browser.i18n.getMessage('MENUS_SearchStudios'),
      contexts: ['selection'],
    });
    browser.contextMenus.create({
      id: 'AL-Search__Characters',
      type: 'normal',
      title: browser.i18n.getMessage('MENUS_SearchCharacters'),
      contexts: ['selection'],
    });
    browser.contextMenus.create({
      id: 'AL-Search__Staff',
      type: 'normal',
      title: browser.i18n.getMessage('MENUS_SearchStaff'),
      contexts: ['selection'],
    });
  }
  else {
    browser.contextMenus.remove('AL-Search__Anime');
    browser.contextMenus.remove('AL-Search__Manga');
    browser.contextMenus.remove('AL-Search__Studios');
    browser.contextMenus.remove('AL-Search__Characters');
    browser.contextMenus.remove('AL-Search__Staff');
  }
}

export async function init() {
  // Menus handlers.
  browser.contextMenus.onClicked.addListener((info: any) => {
    const value = info.selectionText;
    let url = `?sort=SEARCH_MATCH&search=${value}`;

    switch (info.menuItemId) {
      case 'AL-Search__Anime':
        url = `${process.env.VUE_APP_ANILIST_ANIME_URL}${url}`;
        break;

      case 'AL-Search__Manga':
        url = `${process.env.VUE_APP_ANILIST_MANGA_URL}${url}`;
        break;

      case 'AL-Search__Studios':
        url = `${process.env.VUE_APP_ANILIST_STUDIOS_URL}${url}`;
        break;

      case 'AL-Search__Characters':
        url = `${process.env.VUE_APP_ANILIST_CHARACTERS_URL}${url}`;
        break;

      case 'AL-Search__Staff':
        url = `${process.env.VUE_APP_ANILIST_STAFF_URL}${url}`;
        break;

      default:
        break;
    }

    // Open AniList search page.
    browser.tabs.create({ url });
  });

  // Add contextual menus.
  const settings = await Settings.getSettings();

  toggle(!settings || settings.integration.menusEnabled);
}
