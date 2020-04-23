import { create } from '@/content-scripts/web-integration/Button';

/**
 * Display overlay for anime page.
 */
async function animePage(): Promise<void> {
  await create({ selector: '.show-title' });

  // Move the uservoice button
  const uservoiceNode = document.getElementById('uservoice-trigger');

  // Move the uservoice button for consistency
  if (uservoiceNode) {
    uservoiceNode.style.right = '70px';
    uservoiceNode.style.bottom = '14px';
  }
}

function init(): void {
  // In case we are on an anime page.
  if (document.querySelector('.show-details')) {
    animePage();
  }
}

init();
