import WebIntegration from '@/utils/WebIntegration';
import * as Enum from '@/utils/Enum';

/**
 * Display overlay for anime page.
 */
function animePage(): void {
  const titleNode = document.querySelector('body > .SerieV2 meta[itemprop="alternativeHeadline"]');
  const displayTitleNode = document.querySelector('body > .SerieV2 meta[itemprop="name"]');

  const title = titleNode ? titleNode.getAttribute('content') : null;
  const displayTitle = displayTitleNode ? displayTitleNode.getAttribute('content') : null;

  if (title) WebIntegration.displayButton(title, Enum.SearchType.ANIME, displayTitle);
}

/**
 * Display overlay for anime episode page.
 */
function animeEpisodePage(): void {
  const titleNode = document.querySelector('body > .episode .episode_info > .border-list > li:first-child > span.border-list_text') as HTMLElement;
  const displayTitleNode = document.querySelector('body > .episode span[itemprop="partOfSeries"] meta[itemprop="name"]');

  const title = titleNode ? titleNode.innerText : null;
  const displayTitle = displayTitleNode ? displayTitleNode.getAttribute('content') : null;

  if (title) WebIntegration.displayButton(title, Enum.SearchType.ANIME, displayTitle);
}

async function init() {
  try {
    if (!(await WebIntegration.isEnabled())) return;

    // In case we are on an anime page.
    if (document.querySelector('body > .SerieV2')) {
      animePage();
    }

    // In case we are on an anime episode page.
    if (document.querySelector('body > .episode')) {
      animeEpisodePage();
    }
  }
  catch (e) {
    console.error(e);
  }
}

init();
