import StorageHelper from '@/utils/StorageHelper';
import * as Enum from '@/utils/Enum';

const browser = require('webextension-polyfill'); // eslint-disable-line

/**
 * Get search url.
 */
function getSearchUrl(value: string, type: Enum.SearchType): string {
  let url = `?sort=SEARCH_MATCH&search=${value}`;

  switch (type) {
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
 * Get html content to inject.
 */
function getHtml(
  value: string,
  type: Enum.SearchType,
  entry: AniSearch.AniList.Data | null,
): HTMLDivElement {
  // eslint-disable max-len

  // If entry exists, add a "Show on AniList" button.
  const showButton = entry === null ? '' : `
  <li class="action">
    <a href="${entry.siteUrl}" title="${browser.i18n.getMessage('S_SeeOnAniList', value).replace(/"/g, '')}">
      <svg data-v-4c80f226="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path data-v-4c80f226="" fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
      </svg>
    </a>
  </li>`;

  const searchButton = `
  <li class="action">
    <a href="${getSearchUrl(value, type)}" title="${browser.i18n.getMessage('S_SearchFor', value).replace(/"/g, '')}">
      <svg data-v-4c80f226="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path data-v-4c80f226="" fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
      </svg>
    </a>
  </li>`;

  const style = `
  <style>
    @keyframes ani-search-enter {
      0% {
        opacity: 0;
        transform: translateX(5px);
      }

      100% {
        opacity: 1;
        transform: translateX(0px);
      }
    }

    #ani-search {
      align-items: stretch;
      animation: ani-search-enter 0.2s ease;
      bottom: 20px;
      display: flex;
      flex-direction: row;
      font-size: 12px;
      justify-content: flex-end;
      position: fixed;
      right: 20px;
      z-index: 99999;
    }

    #ani-search__button {
      background-color: rgb(31, 38, 49);
      background-image: url('https://yellowfish085.github.io/ani-search/img/logo.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 60%;
      border-radius: 3px;
      box-shadow: 0 2px 20px rgba(49, 54, 68, .09);
      cursor: pointer;
      display: inline-block;
      padding: 15px;
    }

    #ani-search__menu {
      background-color: rgb(31, 38, 49);
      border-radius: 3px;
      box-shadow: 0 2px 20px rgba(49, 54, 68, .09);
      margin-right: 8px;
      opacity: 0;
      pointer-events: none;
      position: relative;
      transform: translateX(5px);
      width: 0;
    }

    #ani-search__menu > ul {
      align-items: center;
      color: rgb(237, 241, 245);
      display: flex;
      flex-direction: row;
      height: 100%;
      justify-content: flex-end;
      padding: 0 12px;
    }

    #ani-search__menu > ul > li:first-child {
      font-weight: bold;
      margin-right: 20px;
      white-space: nowrap;
    }

    #ani-search__menu > ul > li:first-child span {
      font-weight: normal;
      margin-left: 4px;
    }

    #ani-search__menu > ul > li.action {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      white-space: nowrap;
    }

    #ani-search__menu > ul > li.action:not(:last-child) {
      margin-right: 14px;
    }

    #ani-search__menu > ul > li.action > a {
      display: block;
      height: 12px;
      width: 12px;
    }

    #ani-search__menu > ul > li.action > a > svg {
      color: rgb(61,180,242);
    }

    #ani-search__arrow {
      border-color: transparent;
      border-left-color: rgb(31, 38, 49);
      border-style: solid;
      border-width: 6px;
      border-right-width: 0;
      display: block;
      height: 0;
      position: absolute;
      right: -5px;
      top: 10px;
      width: 0;
      z-index: 999999;
    }

    #ani-search:hover #ani-search__menu {
      opacity: 1;
      pointer-events: initial;
      transform: translateX(0px);
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
      width: 100%;
    }
  </style>`;

  const content = `<div id="ani-search__menu"><ul><li>${value}<span>on AniList</span></li>${showButton}${searchButton}</ul><div id="ani-search__arrow"></div></div><span id="ani-search__button" title="Ani-Search"></span>${style}`;
  // eslint-enable max-len

  // Create node and return it.
  const node = document.createElement('div');
  node.setAttribute('id', 'ani-search');
  node.innerHTML = content;

  return node;
}

/**
 * Find something on AniList.
 */
async function find(value: string, type: Enum.SearchType): Promise<AniSearch.AniList.Data | null> {
  const data: AniSearch.Search.Search = {
    value,
    type,
  };

  const response = await browser.runtime.sendMessage({
    code: 'SEARCH_SINGLE',
    data,
  });

  if (response.code !== 'SEARCH_SUCCESS') throw new Error(response.message);

  return response.entry;
}

/**
 * Is the web integration enabled?
 */
async function isEnabled(): Promise<boolean> {
  const settings = await StorageHelper.getSettings();

  return settings !== null && settings.integration.webEnabled;
}

/**
 * Display Ani-Search button on page.
 */
async function displayButton(value: string, type: Enum.SearchType): Promise<void> {
  try {
    const entry = await find(value, type);

    document.body.appendChild(getHtml(value, type, entry));
  }
  catch (e) {
    console.error(e);
  }
}

export default {
  isEnabled,
  displayButton,
};
