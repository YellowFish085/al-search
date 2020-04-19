import WebIntegration from '@/utils/WebIntegration';
import * as Enum from '@/utils/Enum';

/**
 * Display overlay for anime page.
 */
function animePage(): void {
  const titleNode = document.querySelector('#main > .content-series2');

  const title = titleNode ? titleNode.getAttribute('data-title') : null;

  if (title) WebIntegration.displayButton(title, Enum.SearchType.ANIME);
}

/**
 * Display overlay for anime episode page.
 */
function animeEpisodePage(): void {
  const titleNode = document.querySelector('#video-details h1 > a') as HTMLElement;

  const title = titleNode ? titleNode.innerText : null;

  if (title) WebIntegration.displayButton(title, Enum.SearchType.ANIME);
}

async function init() {
  try {
    if (!(await WebIntegration.isEnabled())) return;

    // In case we are on an anime page.
    if (document.querySelector('#main > .content-series2')) {
      animePage();
    }

    // In case we are on an anime episode page.
    if (document.getElementById('video-details')) {
      animeEpisodePage();
    }
  }
  catch (e) {
    console.error(e);
  }
}

init();
