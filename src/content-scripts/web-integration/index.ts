import * as Enum from '@/utils/Enum';
import Button from '@/content-scripts/web-integration/Button';
import Settings from '@/utils/Settings';

interface Position {
  inPage: boolean;
  x: Enum.WebIntegrationX;
  y: Enum.WebIntegrationY;
}

interface PositionnOverride {
  inPage?: boolean;
  x?: Enum.WebIntegrationX;
  y?: Enum.WebIntegrationY;
}

interface OverlayParameters {
  /**
   * CSS selector used to find the search value for the content.
   *
   * The code will look into the content of the corresponding node and use it to search on AniList.
   */
  selector: string;

  /**
   * CSS selector used to find the title displayed to the user.
   *
   * The code will look into the content of the corresponding node and use it as a display.
   *
   * If no value is provided, `selector` will be used instead.
   */
  selectorTitle?: string;

  /** Data type. */
  type?: Enum.SearchType;

  /**
   * Override method used to find the search value from the node corresponding to `selector`.
   *
   * By default, the code will use the `innerText` of the node.
   *
   * If a specific flow need to be executed for a page, provide this method.
   */
  getValue?: (node: HTMLElement) => string | null;

  /**
   * Override method used to find the title from the node corresponding to `selectorTitle`.
   *
   * By default, the code will use the `innerText` of the node.
   *
   * If a specific flow need to be executed for a page, provide this method.
   */
  getTitle?: (node: HTMLElement) => string | null;

  /**
   * Custom callback when the button is inserted in a node in the page and not as a fixed element.
   *
   * This method is only called when the user settings `inPage` is set to `true`.
   *
   * This method receives one parameter which is the button node.
   */
  appendInPage: (node: HTMLElement) => void;

  /**
   * Overrides button position settings.
   *
   * If a page needs the button to be placed in a specific way because it can't be placed any other
   * ways, use this object to override the user settings and force the button position.
   */
  positionOverride?: PositionnOverride;
}

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
function getPosition(settings: ALSearch.Settings, positionOverride?: PositionnOverride): Position {
  const p = {
    inPage: settings.integration.overlay.inPage,
    x: settings.integration.overlay.x,
    y: settings.integration.overlay.y,
  };

  if (positionOverride && Object.prototype.hasOwnProperty.call(positionOverride, 'inPage')) {
    p.inPage = positionOverride.inPage!;
  }

  if (positionOverride && Object.prototype.hasOwnProperty.call(positionOverride, 'x')) {
    p.x = positionOverride.x!;
  }

  if (positionOverride && Object.prototype.hasOwnProperty.call(positionOverride, 'y')) {
    p.y = positionOverride.y!;
  }

  return p;
}

/**
 * Create and add a button in the page if the user has enabled web integration.
 *
 * @param args Button arguments.
 */
export default async function create(args: OverlayParameters): Promise<Button | null> {
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
     * Create instance and the button node.
     */
    const position = getPosition(settings, args.positionOverride);

    const button = new Button(
      position,
      args.type || Enum.SearchType.ANIME,
      value,
      title,
    );

    const node = await button.create();

    /**
     * Append node to document.
     */
    if (!position.inPage) {
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
