import WebIntegration from '@/utils/WebIntegration';
import * as Enum from '@/utils/Enum';

/**
 * Display overlay for anime page.
 */
function animePage(): void {
  const titleNode = document.querySelector('#showview-content-header > .ch-left > .ellipsis > span');

  const title = titleNode ? titleNode.innerHTML : null;

  if (title) WebIntegration.displayButton(title, Enum.SearchType.ANIME);
}

/**
 * Display overlay for anime episode page.
 */
function animeEpisodePage(): void {
  const titleNode = document.querySelector('.showmedia-header > h1.ellipsis > a > span');

  const title = titleNode ? titleNode.innerHTML : null;

  if (title) WebIntegration.displayButton(title, Enum.SearchType.ANIME);
}

/**
 * Display overlay for manga page.
 */
function mangaPage(): void {
  const titleNode = document.querySelector('#container > h1.ellipsis');

  if (titleNode) {
    const split = titleNode.textContent!.split(' > ');

    const title = split.length >= 2 ? split[1] : null;

    if (title) WebIntegration.displayButton(title, Enum.SearchType.MANGA);
  }
}

/**
 * Display overlay for manga chapter page.
 */
function mangaChapterPage(): void {
  const titleNode = document.querySelector('#showmedia_mangareader_title > h1.ellipsis > a > span');

  const title = titleNode ? titleNode.innerHTML : null;

  if (title) WebIntegration.displayButton(title, Enum.SearchType.MANGA);
}

async function init() {
  try {
    if (!(await WebIntegration.isEnabled())) return;

    // In case we are on an anime page.
    if (document.getElementById('main_tab_videos')) {
      animePage();
    }

    // In case we are on an anime episode page.
    if (document.getElementById('showmedia_video')) {
      animeEpisodePage();
    }

    // In case we are on a manga page.
    if (document.getElementById('main_tab_volumes')) {
      mangaPage();
    }

    // In case we are on a manga chapter page.
    if (document.getElementById('showmedia_mangareader_title')) {
      mangaChapterPage();
    }
  }
  catch (e) {
    console.error(e);
  }
}

init();
