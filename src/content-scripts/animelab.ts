import WebIntegration from '@/utils/WebIntegration';
import * as Enum from '@/utils/Enum';

/**
 * Display overlay for anime page.
 */
function animePage(): void {
  const titleNode = document.querySelector('.show-title');

  const title = titleNode ? titleNode.innerHTML : null;

  if (title) {
    // Display the AL Search button
    WebIntegration.displayButton(title, Enum.SearchType.ANIME);

    // Move the uservoice button
    const uservoiceNode = document.getElementById('uservoice-trigger');

    // Move the uservoice button for consistency
    if (uservoiceNode) {
      uservoiceNode.style.right = '70px';
      uservoiceNode.style.bottom = '14px';
    }
  }
}

async function init() {
  try {
    if (!(await WebIntegration.isEnabled())) return;

    // In case we are on an anime page.
    if (document.querySelector('.show-details')) {
      animePage();
    }
  }
  catch (e) {
    console.error(e);
  }
}

init();
