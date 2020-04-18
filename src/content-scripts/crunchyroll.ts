import WebIntegration from '@/utils/WebIntegration';
import * as Enum from '@/utils/Enum';

/**
 * Try to get an anime title from the page.
 */
function getAnimeTitle(): string | null {
  const titleNode = document.querySelector('#showview-content-header > .ch-left > .ellipsis > span');

  return titleNode ? titleNode.innerHTML : null;
}

/**
 * Try to get a manga title from the page.
 */
function getMangaTitle(): string | null {
  const titleNode = document.querySelector('#container > h1.ellipsis');

  if (titleNode) {
    const split = titleNode.textContent!.split(' > ');

    if (split.length >= 2) return split[1];
  }

  return null;
}

async function init() {
  try {
    if (!(await WebIntegration.isEnabled())) return;

    // In case we are on a video page.
    if (document.getElementById('main_tab_videos')) {
      const title = getAnimeTitle();

      if (title) WebIntegration.displayButton(title, Enum.SearchType.ANIME);
    }

    // In case we are on a manga page.
    if (document.getElementById('main_tab_volumes')) {
      const title = getMangaTitle();

      if (title) WebIntegration.displayButton(title, Enum.SearchType.MANGA);
    }
  }
  catch (e) {
    console.error(e);
  }
}

init();
