/* eslint-disable no-param-reassign */
import create from '@/content-scripts/web-integration';

function init(): void {
  // In case we are on an anime page.
  if (document.querySelector('#main > .content-series2')) {
    create({
      selector: '#main > .content-series2',
      getValue: (node: HTMLElement) => node.getAttribute('data-title'),
      getTitle: (node: HTMLElement) => node.getAttribute('data-title'),
      appendInPage: (node: HTMLElement) => {
        // Some shows have a title text, other don't, so we need to check that.
        const title = document.querySelector('#main > .content-series2 .show-detail-information h1.heroTitle');
        const rating = document.querySelector('#main > .content-series2 .show-detail-information .review-rating-stars');

        if (title) {
          node.style.marginBottom = '10px';
          title.parentNode!.insertBefore(node, title);
        }
        else if (rating) {
          node.style.marginTop = '10px';
          rating.parentNode!.insertBefore(node, rating);
        }
      },
    });
  }

  // In case we are on an anime episode page.
  if (document.getElementById('video-details')) {
    create({
      selector: '#video-details h1 > a',
      appendInPage: (node: HTMLElement) => {
        node.style.marginBottom = '10px';

        const target = document.querySelector('#video-details h1.show-headline');
        if (target) target.parentNode!.insertBefore(node, target);
      },
    });
  }
}

init();
