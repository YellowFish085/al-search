/* eslint-disable no-param-reassign */
import create from '@/content-scripts/web-integration';

function init(): void {
  // In case we are on an anime page.
  if (document.querySelector('body .adn-maincontent meta[itemprop="name"]')) {
    create({
      selector: 'body .adn-maincontent meta[itemprop="name"]',
      getValue: (node: HTMLElement) => node.getAttribute('content'),
      getTitle: (node: HTMLElement) => node.getAttribute('content'),
      appendInPage(node: HTMLElement): void {
        node.style.marginBottom = '10px';
        node.style.textAlign = 'left';

        const target = document.querySelector('body .adn-maincontent .header h1');
        if (target) target.prepend(node);

        const targetMobile = document.querySelector('body .adn-maincontent .mobile-h1');
        if (targetMobile) targetMobile.prepend(node.cloneNode(true));
      },
    });
  }

  // In case we are on an anime episode page.
  if (document.querySelector('body .adn-maincontent .adn-player-header h1 > a')) {
    create({
      selector: 'body .adn-maincontent .adn-player-header h1 > a',
      appendInPage(node: HTMLElement): void {
        node.style.marginBottom = '10px';
        node.style.textAlign = 'left';

        const target = document.querySelector('body .adn-maincontent .adn-player-header h1');
        if (target) target.prepend(node);
      },
    });
  }
}

init();
