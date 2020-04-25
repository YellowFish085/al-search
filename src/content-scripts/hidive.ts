/* eslint-disable no-param-reassign */
import create from '@/content-scripts/web-integration';

/**
 * All pages have the same layout.
 */
function appendInPage(node: HTMLElement, selector: string): void {
  node.style.marginBottom = '10px';

  const target = document.querySelector(selector);
  if (target) target.prepend(node);
}

function init(): void {
  // In case we are on an anime / movie page.
  if (document.getElementById('showInfoPageEpisodes')) {
    create({
      selector: '#showInfoPage .details .information h1 a',
      appendInPage: (node: HTMLElement) => appendInPage(node, '#showInfoPage .details .information h1'),
    });
  }

  // In case we are on an anime / movie episode page.
  if (document.getElementById('videoArea')) {
    create({
      selector: '#TitleDetails',
      appendInPage: (node: HTMLElement) => appendInPage(node, '#TitleDetails'),
    });
  }
}

init();
