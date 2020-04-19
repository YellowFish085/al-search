import WebIntegration from '@/utils/WebIntegration';
import * as Enum from '@/utils/Enum';

/**
 * Try to get an anime title from the page.
 */
function getAnimeTitle(): string | null {
  const titleNode = document.querySelector('body > .SerieV2 meta[itemprop="alternativeHeadline"]');

  return titleNode ? titleNode.getAttribute('content') : null;
}

/**
 * Try to get an anime display name from the page.
 */
function getDisplayTitle(): string | null {
  const titleNode = document.querySelector('body > .SerieV2 meta[itemprop="name"]');

  return titleNode ? titleNode.getAttribute('content') : null;
}

async function init() {
  try {
    if (!(await WebIntegration.isEnabled())) return;

    // In case we are on a video page.
    if (document.querySelector('body > .SerieV2')) {
      const title = getAnimeTitle();

      if (title) WebIntegration.displayButton(title, Enum.SearchType.ANIME, getDisplayTitle());
    }
  }
  catch (e) {
    console.error(e);
  }
}

init();
