import * as Enum from '../../shared/enums-esm.js';
import { QueriesSearch, QueryUser } from './graphql/index.js';
import Search from './graphql/search.js';
import Storage from '../utils/storage.js';
import User from './graphql/user.js';

if (!('browser' in self)) {
  self.browser = self.chrome;
}

export default class Anilist {
  static GRAPHQL_URL = "https://graphql.anilist.co";

  #accessToken;

  constructor(token) {
    this.#accessToken = token;
  }

  /**
   * Get AniList API request headers.
   */
  #headers() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept',       'application/json');

    if (this.#accessToken) {
      headers.append('Authorization', `Bearer ${this.#accessToken}`);
    }

    return headers;
  }

  /**
   * Authenticate client.
   */
  async authenticate() {
    this.#accessToken = await Storage.get(Storage.KEYS.ACCESS_TOKEN);

    return this;
  }

  /**
   * Get authenticated user data.
   */
  async user() {
    try {
      const body = await (await fetch(Anilist.GRAPHQL_URL, {
        method:  'POST',
        headers: this.#headers(),
        body:    JSON.stringify({ query: QueryUser }),
      })).json();

      // Ensure data are valid.
      if (!body.data || !body.data.Viewer || !User.schemaIsValid(body.data.Viewer)) {
        if (body.errors && Array.isArray(body.errors) && body.errors[0] && body.errors[0].message === "Invalid token") {
          throw new Error(browser.i18n.getMessage('ERROR_ExpiredAccessToken'));
        }

        throw new Error(browser.i18n.getMessage('ERROR_InvalidAnilistUser', JSON.stringify(body)));
      }

      return body.data.Viewer;
    }
    catch (e) {
      throw new Error(browser.i18n.getMessage('ERROR_AnilistRequestFailed', e.message));
    }
  }

  /**
   * Search something on AniList.
   */
  async search(variables, onList = false) {
    try {
      let params = {
        query:     QueriesSearch[variables.type],
        variables: {
          search:  variables.q,
          type:    variables.type,
          isAdult: false,
        },
      };

      if ([Enum.SearchType.ANIME, Enum.SearchType.MANGA].includes(variables.type)) {
        params.variables.onList = onList;

        if (variables.year) {
          params.variables.year = `${variables.year}%`;
        }

        if (Enum.SearchType.ANIME === variables.type && variables.season) {
          params.variables.year = variables.season;
        }
      }

      const body = await (await fetch(Anilist.GRAPHQL_URL, {
        method:  'POST',
        headers: this.#headers(),
        body:    JSON.stringify(params),
      })).json();

      // Ensure data are valid.
      if (!body.data || !Search.schemaIsValid(body.data, variables.type)) {
        throw new Error(browser.i18n.getMessage('ERROR_InvalidSearchResults'));
      }

      return body.data.Page[Enum.ResponseTypeKeys[variables.type]];
    }
    catch (e) {
      throw new Error(browser.i18n.getMessage('ERROR_AnilistRequestFailed', e.message));
    }
  }
}
