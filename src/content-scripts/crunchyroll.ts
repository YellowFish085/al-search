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

function init(): void {
  // In case we are on an anime page.
  if (document.getElementById('main_tab_videos')) {
    create({ selector: '#showview-content-header > .ch-left > .ellipsis > span' });
  }

  // In case we are on an anime episode page.
  if (document.getElementById('showmedia_video')) {
    create({ selector: '.showmedia-header > h1.ellipsis > a > span' });
  }

  // In case we are on an manga page.
  if (document.getElementById('main_tab_volumes')) {
    create({
      selector: '#container > h1.ellipsis',
      type: Enum.SearchType.MANGA,
    }, MangaPageButton);
  }

  // In case we are on an manga chapter page.
  if (document.getElementById('showmedia_mangareader_title')) {
    create({
      selector: '#showmedia_mangareader_title > h1.ellipsis > a > span',
      type: Enum.SearchType.MANGA,
    });
  }
}

init();
