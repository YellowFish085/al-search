import * as Enum from '@/utils/Enum';
import Button from '@/content-scripts/web-integration/Button';
import Settings from '@/utils/Settings';

/**
 * Get a node form the document.
 */
function getNode(selector: string): HTMLElement | null {
  const node = document.querySelector(selector);

  return node ? node as HTMLElement : null;
}

/**
 * Find value from node.
 */
function getValue(node: HTMLElement): string {
  return node.innerText;
}

/**
 * Find title from node.
 */
function getTitle(node: HTMLElement): string {
  return node.innerText;
}

/**
 * Get button position.
 */
function getOverlayConfig(
  settings: ALSearch.Settings,
  overlayOverride?: ALSearch.WebIntegration.OverlayOverride,
): ALSearch.WebIntegration.Overlay {
  return overlayOverride
    ? { ...settings.integration.overlay, ...overlayOverride }
    : settings.integration.overlay;
}

/**
 * Create and add a button in the page if the user has enabled web integration.
 *
 * @param args Button arguments.
 */
export default async function create(
  args: ALSearch.WebIntegration.OverlayParameters,
): Promise<Button | null> {
  try {
    const settings = await Settings.getSettings();

    // If web integration is disabled, return.
    if (!settings.integration.webEnabled) return null;

    /**
     * Try to find search value and title in page.
     */
    let value: string | null = null;
    let title: string | null = null;

    const nodeValue = getNode(args.selector);
    if (nodeValue) value = args.getValue ? args.getValue(nodeValue) : getValue(nodeValue);

    const nodeTitle = getNode(args.selectorTitle || args.selector);
    if (nodeTitle) title = args.getTitle ? args.getTitle(nodeTitle) : getTitle(nodeTitle);

    // If value or title could not be found, return.
    if (!value || !title) return null;

    /**
     * Get overlay config.
     */
    const overlay = getOverlayConfig(settings, args.overlayOverride);

    /**
     * Create instance and the button node.
     */
    const button = new Button(
      overlay,
      args.type || Enum.SearchType.ANIME,
      value,
      title,
    );

    const node = await button.create();

    /**
     * Append node to document.
     */
    if (!overlay.inPage) {
      document.body.appendChild(node);
    }
    else {
      args.appendInPage(node);
    }

    return button;
  }
  catch (e) {
    console.error(e);
  }

  return null;
}
