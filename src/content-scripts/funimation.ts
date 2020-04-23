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

function init(): void {
  // In case we are on an anime page.
  if (document.querySelector('#main > .content-series2')) {
    create({ selector: '#main > .content-series2' }, AnimeButton);
  }

  // In case we are on an anime episode page.
  if (document.getElementById('video-details')) {
    create({ selector: '#video-details h1 > a' });
  }
}

init();
