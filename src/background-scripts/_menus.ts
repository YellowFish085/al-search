const browser = require('webextension-polyfill'); // eslint-disable-line

// Add contextual menus to quick search selected text on AniList.
browser.contextMenus.create({
  id: 'AniSearch__Anime',
  type: 'normal',
  title: 'AniList anime search for "%s"',
  contexts: ['selection'],
});
browser.contextMenus.create({
  id: 'AniSearch__Manga',
  type: 'normal',
  title: 'AniList manga search for "%s"',
  contexts: ['selection'],
});
browser.contextMenus.create({
  id: 'AniSearch__Studios',
  type: 'normal',
  title: 'AniList studios search for "%s"',
  contexts: ['selection'],
});
browser.contextMenus.create({
  id: 'AniSearch__Characters',
  type: 'normal',
  title: 'AniList characters search for "%s"',
  contexts: ['selection'],
});
browser.contextMenus.create({
  id: 'AniSearch__Staff',
  type: 'normal',
  title: 'AniList staff search for "%s"',
  contexts: ['selection'],
});

// Menus handlers.
browser.contextMenus.onClicked.addListener((info: any) => {
  switch (info.menuItemId) {
    case 'AniSearch__Anime':
      browser.tabs.create({ url: `${process.env.VUE_APP_ANILIST_ANIME_URL}?sort=SEARCH_MATCH&search=${info.selectionText}` });
      break;

    case 'AniSearch__Manga':
      browser.tabs.create({ url: `${process.env.VUE_APP_ANILIST_MANGA_URL}?sort=SEARCH_MATCH&search=${info.selectionText}` });
      break;

    case 'AniSearch__Studios':
      browser.tabs.create({ url: `${process.env.VUE_APP_ANILIST_STUDIOS_URL}?sort=SEARCH_MATCH&search=${info.selectionText}` });
      break;

    case 'AniSearch__Characters':
      browser.tabs.create({ url: `${process.env.VUE_APP_ANILIST_CHARACTERS_URL}?sort=SEARCH_MATCH&search=${info.selectionText}` });
      break;

    case 'AniSearch__Staff':
      browser.tabs.create({ url: `${process.env.VUE_APP_ANILIST_STAFF_URL}?sort=SEARCH_MATCH&search=${info.selectionText}` });
      break;

    default:
      break;
  }
});
