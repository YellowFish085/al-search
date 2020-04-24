import Settings from '@/utils/Settings';
import * as Enum from '@/utils/Enum';

const browser = require('webextension-polyfill'); // eslint-disable-line

export class Button {
  settings: ALSearch.Settings;

  /** Selector for value node. */
  selector: string;

  /** Selector for title node. */
  selectorTitle: string;

  /** Data type. */
  type: Enum.SearchType;

  /** Document node where the value is. */
  node: HTMLElement | null;

  /** Document node where the title is. */
  nodeTitle: HTMLElement | null;

  /** Value. */
  value: string | null;

  /** title. */
  title: string | null;

  /** AniList data record */
  entry: ALSearch.AniList.Data | null;

  constructor(
    settings: ALSearch.Settings,
    selector: string,
    selectorTitle: string,
    type: Enum.SearchType,
  ) {
    this.settings = settings;
    this.selector = selector;
    this.selectorTitle = selectorTitle;
    this.type = type;
    this.node = null;
    this.nodeTitle = null;
    this.value = null;
    this.title = null;
    this.entry = null;
  }

  /**
   * Get a node form the document.
   */
  protected getNode(selector: string): HTMLElement | null {
    const node = document.querySelector(selector);

    return node ? node as HTMLElement : null;
  }

  /**
   * Find value from node.
   *
   * This method is only called if `this.node` exists.
   */
  protected findValue(): string {
    return this.node!.innerText;
  }

  /**
   * Find title from node.
   *
   * This method is only called if `this.nodeTitle` exists.
   */
  protected findTitle(): string {
    return this.nodeTitle!.innerText;
  }

  /**
   * Find something on AniList.
   */
  protected async findEntry(): Promise<ALSearch.AniList.Data | null> {
    const data: ALSearch.Search.Search = {
      value: this.value!,
      type: this.type!,
    };

    const response = await browser.runtime.sendMessage({
      code: 'SEARCH_SINGLE',
      data,
    });

    if (response.code !== 'SEARCH_SUCCESS') throw new Error(response.message);

    return response.entry;
  }

  /**
   * Get search url.
   */
  protected getSearchUrl(): string {
    let url = `?sort=SEARCH_MATCH&search=${this.value}`;

    switch (this.type) {
      case Enum.SearchType.ANIME:
        url = `${process.env.VUE_APP_ANILIST_ANIME_URL}${url}`;
        break;

      case Enum.SearchType.MANGA:
        url = `${process.env.VUE_APP_ANILIST_MANGA_URL}${url}`;
        break;

      case Enum.SearchType.STUDIOS:
        url = `${process.env.VUE_APP_ANILIST_STUDIOS_URL}${url}`;
        break;

      case Enum.SearchType.CHARACTERS:
        url = `${process.env.VUE_APP_ANILIST_CHARACTERS_URL}${url}`;
        break;

      case Enum.SearchType.STAFF:
        url = `${process.env.VUE_APP_ANILIST_STAFF_URL}${url}`;
        break;

      default:
        break;
    }

    return url;
  }

  /**
   * Get "show on AniList" button if entry exists.
   */
  protected getShowButton(): string {
    // eslint-disable max-len
    return this.entry === null
      ? ''
      : `
    <li class="al-search__action">
      <a href="${this.entry.siteUrl}"
         title="${browser.i18n.getMessage('S_SeeOnAniList', this.title).replace(/"/g, '')}">
        <svg data-v-4c80f226="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path data-v-4c80f226="" fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
        </svg>
      </a>
    </li>`;
    // eslint-enable max-len
  }

  /**
   * Get "search on AniList" button.
   */
  protected getSearchButton(): string {
    // eslint-disable max-len
    return `
    <li class="al-search__action">
      <a href="${this.getSearchUrl()}"
         title="${browser.i18n.getMessage('S_SearchFor', this.title).replace(/"/g, '')}">
        <svg data-v-4c80f226="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path data-v-4c80f226="" fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </a>
    </li>`;
    // eslint-enable max-len
  }

  /**
   * Get style.
   */
  protected getStyle(): string {
    return `
    <style>
      @keyframes al-search-enter-left {
        0% {
          opacity: 0;
          transform: translateX(-5px);
        }

        100% {
          opacity: 1;
          transform: translateX(0px);
        }
      }

      @keyframes al-search-enter-right {
        0% {
          opacity: 0;
          transform: translateX(5px);
        }

        100% {
          opacity: 1;
          transform: translateX(0px);
        }
      }

      #al-search {
        align-items: stretch;
        display: flex;
        font-size: 12px;
        position: fixed;
        z-index: 2147483647;
      }

      #al-search.al-search--top {
        top: 20px;
      }

      #al-search.al-search--bottom {
        bottom: 20px;
      }

      #al-search.al-search--center {
        top: 50%;
      }

      #al-search.al-search--left {
        animation: al-search-enter-left 0.2s ease;
        left: 20px;
        flex-direction: row-reverse;
        justify-content: flex-start;
      }

      #al-search.al-search--right {
        animation: al-search-enter-right 0.2s ease;
        flex-direction: row;
        justify-content: flex-end;
        right: 20px;
      }

      #al-search.al-search--left {
        left: 20px;
      }

      #al-search__button {
        background-color: rgb(31, 38, 49);
        background-image: url('https://yellowfish085.github.io/al-search/img/logo.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 60%;
        border-radius: 3px;
        box-shadow: 0 2px 20px rgba(49, 54, 68, .09);
        cursor: pointer;
        display: inline-block;
        padding: 15px;
      }

      #al-search__menu {
        background-color: rgb(31, 38, 49);
        border-radius: 3px;
        box-shadow: 0 2px 20px rgba(49, 54, 68, .09);
        opacity: 0;
        pointer-events: none;
        position: relative;
        width: 0;
      }

      #al-search.al-search--left #al-search__menu {
        margin-left: 8px;
        transform: translateX(-5px);
      }

      #al-search.al-search--right #al-search__menu {
        margin-right: 8px;
        transform: translateX(5px);
      }

      #al-search__menu > ul {
        align-items: center;
        color: rgb(237, 241, 245);
        display: flex;
        flex-direction: row;
        height: 100%;
        justify-content: flex-end;
        margin: 0;
        padding: 0 12px;
      }

      #al-search__menu > ul > li {
        list-style: none !important;
      }

      #al-search__menu > ul > li:first-child {
        font-weight: bold;
        margin: 0 20px 0 0;
        padding: 0;
        white-space: nowrap;
      }

      #al-search__menu > ul > li:first-child span {
        font-weight: normal;
        margin-left: 4px;
      }

      #al-search__menu > ul > li.al-search__action {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        white-space: nowrap;
      }

      #al-search__menu > ul > li.al-search__action:not(:last-child) {
        margin-right: 14px;
      }

      #al-search__menu > ul > li.al-search__action > a {
        display: block;
        height: 12px;
        width: 12px;
      }

      #al-search__menu > ul > li.al-search__action > a > svg {
        color: rgb(61,180,242);
        vertical-align: initial !important; /* Wakanim */
      }

      #al-search__arrow {
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        display: block;
        height: 0;
        position: absolute;
        top: 10px;
        width: 0;
        z-index: 999999;
      }

      #al-search.al-search--left #al-search__arrow {
        border-right-color: rgb(31, 38, 49);
        border-left-width: 0;
        left: -5px;
      }

      #al-search.al-search--right #al-search__arrow {
        border-left-color: rgb(31, 38, 49);
        border-right-width: 0;
        right: -5px;
      }

      #al-search:hover #al-search__menu {
        opacity: 1;
        pointer-events: initial;
        transform: translateX(0px);
        transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
        width: 100%;
      }
    </style>`;
  }

  /**
   * Get wrapper classes.
   */
  protected getWrapperClasses(): string[] {
    const classes = [];

    // X position.
    switch (this.settings.integration.overlay.x) {
      case Enum.WebIntegrationX.LEFT:
        classes.push('al-search--left');
        break;

      case Enum.WebIntegrationX.RIGHT:
      default:
        classes.push('al-search--right');
        break;
    }

    // Y position.
    switch (this.settings.integration.overlay.y) {
      case Enum.WebIntegrationY.TOP:
        classes.push('al-search--top');
        break;

      case Enum.WebIntegrationY.CENTER:
        classes.push('al-search--center');
        break;

      case Enum.WebIntegrationY.BOTTOM:
      default:
        classes.push('al-search--bottom');
        break;
    }

    return classes;
  }

  /**
   * Create button node to inject in the page.
   */
  protected getButtonNode(): HTMLDivElement {
    // Prepare content.
    const showButton = this.getShowButton();
    const searchButton = this.getSearchButton();
    const style = this.getStyle();

    const content = `
    <div id="al-search__menu">
      <ul>
        <li>
          ${this.title}<span>${browser.i18n.getMessage('S_OnAniList')}</span>
        </li>
        ${showButton}
        ${searchButton}
      </ul>
      <div id="al-search__arrow"></div>
    </div>
    <span id="al-search__button" title="AL Search"></span>
    ${style}
    `;

    // Create node.
    const node = document.createElement('div');

    node.setAttribute('id', 'al-search');
    node.classList.add(...this.getWrapperClasses());
    node.innerHTML = content;

    return node;
  }

  /**
   * Display button on page.
   *
   * Button will only be displayed if the user has enabled web integration.
   */
  public async display(): Promise<void> {
    if (!this.settings.integration.webEnabled) return;

    // Init nodes.
    this.node = this.getNode(this.selector);
    this.nodeTitle = this.getNode(this.selectorTitle);

    // Get values from nodes.
    if (this.node) this.value = this.findValue();
    if (this.nodeTitle) this.title = this.findTitle();

    if (this.value && this.title) {
      // Try to find AniList related entry.
      this.entry = await this.findEntry();

      // Append button to page.
      document.body.appendChild(this.getButtonNode());
    }
  }
}

interface OverlayParameters {
  selector: string;
  selectorTitle?: string;
  type?: Enum.SearchType;
}

/**
 * Create a button.
 *
 * @param args Button arguments.
 * @param Klass (optional) Class to instanciate
 */
export async function create(
  args: OverlayParameters,
  Klass: typeof Button = Button,
): Promise<Button | null> {
  try {
    const settings = await Settings.getSettings();

    const btn = new Klass(
      settings,
      args.selector,
      args.selectorTitle || args.selector,
      args.type || Enum.SearchType.ANIME,
    );

    await btn.display();

    return btn;
  }
  catch (e) {
    console.error(e);
  }

  return null;
}
