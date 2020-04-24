/* eslint-disable no-param-reassign */
import { Button, create } from '@/content-scripts/web-integration/Button';

class AnimeButton extends Button {
  /** @inheritdoc */
  protected findValue(): string {
    return this.node!.getAttribute('content')!;
  }

  /** @inheritdoc */
  protected findTitle(): string {
    return this.nodeTitle!.getAttribute('content')!;
  }
}

class AnimeEpisodeButton extends Button {
  /** @inheritdoc */
  protected findTitle(): string {
    return this.nodeTitle!.getAttribute('content')!;
  }
}

function init(): void {
  // In case we are on an anime page.
  if (document.querySelector('body > .SerieV2')) {
    create({
      selector: 'body > .SerieV2 meta[itemprop="alternativeHeadline"]',
      selectorTitle: 'body > .SerieV2 meta[itemprop="name"]',
      appendInPage(node: HTMLElement): void {
        node.style.marginBottom = '10px';
        node.style.textAlign = 'right';

        const target = document.querySelector('body > .SerieV2 .SerieV2-body');
        if (target) target.prepend(node);
      },
    }, AnimeButton);
  }

  // In case we are on an anime episode page.
  if (document.querySelector('body > .episode')) {
    create({
      selector: 'body > .episode .episode_info > .border-list > li:first-child > span.border-list_text',
      selectorTitle: 'body > .episode span[itemprop="partOfSeries"] meta[itemprop="name"]',
      appendInPage(node: HTMLElement): void {
        node.style.display = 'block';
        node.style.marginBottom = '10px';

        const target = document.querySelector('body > .episode h1.episode_h1');
        if (target) target.prepend(node);
      },
    }, AnimeEpisodeButton);
  }
}

init();
