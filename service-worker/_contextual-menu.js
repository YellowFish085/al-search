import Settings from './utils/settings.js';

if (!('browser' in self)) {
  self.browser = self.chrome;
}

export default class ContextualMenu {
  /**
   * Either add or remove contextual menus.
   */
  static toggle(show = true) {
    if (show) {
      [
        { id: 'AL-Search__Anime',      title: browser.i18n.getMessage('CONTEXTUAL_MENU_Anime') },
        { id: 'AL-Search__Manga',      title: browser.i18n.getMessage('CONTEXTUAL_MENU_Manga') },
        { id: 'AL-Search__Studios',    title: browser.i18n.getMessage('CONTEXTUAL_MENU_Studios') },
        { id: 'AL-Search__Characters', title: browser.i18n.getMessage('CONTEXTUAL_MENU_Characters') },
        { id: 'AL-Search__Staff',      title: browser.i18n.getMessage('CONTEXTUAL_MENU_Staff') },
      ].forEach((entry) => {
        browser.contextMenus.create({
          id:       entry.id,
          type:     'normal',
          title:    entry.title,
          contexts: ['selection'],
        });
      });
    }
    else {
      browser.contextMenus.removeAll();
    }
  }

  /**
   * Init contextual menu.
   */
  static async init() {
    // On contextual menu click.
    browser.contextMenus.onClicked.addListener((info) => {
      let url = `?sort=SEARCH_MATCH&search=${info.selectionText}`;

      switch (info.menuItemId) {
        case 'AL-Search__Anime':
          url = `https://anilist.co/search/anime${url}`;
          break;

        case 'AL-Search__Manga':
          url = `https://anilist.co/search/manga${url}`;
          break;

        case 'AL-Search__Studios':
          url = `https://anilist.co/search/studios${url}`;
          break;

        case 'AL-Search__Characters':
          url = `https://anilist.co/search/characters${url}`;
          break;

        case 'AL-Search__Staff':
          url = `https://anilist.co/search/staff${url}`;
          break;
      }

      browser.tabs.create({ url });
    });

    // Add contextual menus.
    const settings = await Settings.get();

    ContextualMenu.toggle(false);

    if (settings && settings.integration.menusEnabled) {
      ContextualMenu.toggle(true);
    }
  }
}