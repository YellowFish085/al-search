/* eslint-disable no-param-reassign */
import { Button, create } from '@/content-scripts/web-integration/Button';

class AnimeButton extends Button {
  /** @inheritdoc */
  protected findValue(): string {
    return this.nodeTitle!.getAttribute('data-title')!;
  }

  /** @inheritdoc */
  protected findTitle(): string {
    return this.findValue();
  }
}

/**
 * Insert node before title.
 */
function appendInPage(node: HTMLElement, selector: string): void {
  node.style.marginBottom = '10px';

  const target = document.querySelector(selector);
  if (target) target.parentNode!.insertBefore(node, target);
}

function init(): void {
  // In case we are on an anime page.
  if (document.querySelector('#main > .content-series2')) {
    create({
      selector: '#main > .content-series2',
      appendInPage(node: HTMLElement): void {
        appendInPage(node, '#main > .content-series2 .show-detail-information h1.heroTitle');
      },
    }, AnimeButton);
  }

  // In case we are on an anime episode page.
  if (document.getElementById('video-details')) {
    create({
      selector: '#video-details h1 > a',
      appendInPage(node: HTMLElement): void {
        appendInPage(node, '#video-details h1.show-headline');
      },
    });
  }
}

init();
