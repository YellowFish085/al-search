/* eslint-disable no-param-reassign */
import create from '@/content-scripts/web-integration';
import Settings from '@/utils/Settings';

/**
 * Display overlay for anime page.
 */
async function animePage(): Promise<void> {
  const settings = await Settings.getSettings();

  await create({
    selector: '.show-title',
    appendInPage(node: HTMLElement): void {
      node.style.marginBottom = '10px';
      node.style.marginTop = '-30px';

      // Insert node before title
      const target = document.querySelector('.show-title');
      if (target) target.parentNode!.insertBefore(node, target);
    },
  });

  // Move the al-search button above the feedback button for consistency
  if (document.getElementById('uservoice-trigger')
   && !settings.integration.overlay.inPage
   && settings.integration.overlay.x === 'RIGHT'
   && settings.integration.overlay.y === 'BOTTOM') {
    const alSearchButton = document.getElementById('al-search');
    if (alSearchButton) {
      alSearchButton.style.right = '6px';
      alSearchButton.style.bottom = '42px';
    }
  }
}

function init(): void {
  // In case we are on an anime page
  if (document.querySelector('.show-details')) {
    animePage();
  }
}

init();
