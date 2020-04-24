/* eslint-disable no-param-reassign */
import { Button, create } from '@/content-scripts/web-integration/Button';
import * as Enum from '@/utils/Enum';

class MangaPageButton extends Button {
  /** @inheritdoc */
  protected findValue(): string {
    const split = this.node!.textContent!.split(' > ');

    return split.length >= 2 ? split[1] : '';
  }

  /** @inheritdoc */
  protected findTitle(): string {
    return this.findValue();
  }
}

/**
 * All pages have the same layout.
 *
 * Add button to the left of the title as an inline element.
 */
function appendInPage(node: HTMLElement, selector: string): void {
  node.style.display = 'inline-block';
  node.style.marginRight = '10px';
  node.style.verticalAlign = 'middle';

  const target = document.querySelector(selector);
  if (target) target.prepend(node);
}

function init(): void {
  // In case we are on an anime page.
  if (document.getElementById('main_tab_videos')) {
    create({
      selector: '#showview-content-header > .ch-left > .ellipsis > span',
      appendInPage(node: HTMLElement): void {
        appendInPage(node, '#showview-content-header > .ch-left > .ellipsis > span');
      },
    });
  }

  // In case we are on an anime episode page.
  if (document.getElementById('showmedia_video')) {
    create({
      selector: '.showmedia-header > h1.ellipsis > a > span',
      appendInPage(node: HTMLElement): void {
        appendInPage(node, '.showmedia-header > h1.ellipsis');
      },
    });
  }

  // In case we are on an manga page.
  if (document.getElementById('main_tab_volumes')) {
    create({
      selector: '#container > h1.ellipsis',
      type: Enum.SearchType.MANGA,
      appendInPage(node: HTMLElement): void {
        appendInPage(node, '#container > h1.ellipsis');
      },
    }, MangaPageButton);
  }

  // In case we are on an manga chapter page.
  if (document.getElementById('showmedia_mangareader_title')) {
    create({
      selector: '#showmedia_mangareader_title > h1.ellipsis > a > span',
      type: Enum.SearchType.MANGA,
      appendInPage(node: HTMLElement): void {
        appendInPage(node, '#showmedia_mangareader_title > h1.ellipsis');
      },
    });
  }
}

init();
