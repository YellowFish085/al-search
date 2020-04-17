import QueriesSearch from '@/anilist/graphql/search';
import QueryUser, { UserSchemaCheck } from '@/anilist/graphql/user';
import * as Enum from '@/utils/Enum';

const browser = require('webextension-polyfill') // eslint-disable-line

export default class AniList {
  readonly token: string | null;

  constructor(token?: string | null) {
    this.token = token || null;
  }

  /**
   * Get AniList GraphQL request headers.
   */
  private headers(): Headers {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (this.token) {
      headers.append('Authorization', `Bearer ${this.token}`);
    }

    return headers;
  }

  /**
   * Get authenticated user data.
   */
  public async user(): Promise<AniSearch.AniList.User> {
    try {
      const response = await fetch(process.env.VUE_APP_ANILIST_GRAPHQL_URL, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify({
          query: QueryUser,
        }),
      });

      const body = await response.json();

      // Do we have the user data in the response?
      if (body.data && body.data.Viewer && UserSchemaCheck(body.data.Viewer)) {
        return body.data.Viewer as AniSearch.AniList.User;
      }

      throw new Error(browser.i18n.getMessage('E_AniListInvalidUser', JSON.stringify(body)));
    }
    catch (e) {
      throw new Error(browser.i18n.getMessage('E_AnilistRequest', e.message));
    }
  }

  /**
   * Search something on AniList.
   */
  public async search(
    variables: AniSearch.Search.Search,
    onList = false,
  ): Promise<AniSearch.Search.Results> {
    // Get correct query based on search type.
    const query = QueriesSearch[variables.type];

    try {
      // Execute search.
      const response = await fetch(process.env.VUE_APP_ANILIST_GRAPHQL_URL, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify({
          query,
          variables: {
            search: variables.value,
            type: variables.type,
            year: variables.year ? `${variables.year}%` : undefined,
            season: variables.season,
            isAdult: false,
            onList,
          },
        }),
      });

      const body = await response.json();

      // Check search results are here.
      if (!body.data
        || !body.data.Page
        || !body.data.Page[Enum.ResponseTypeKeys[variables.type]]
        || !Array.isArray(body.data.Page[Enum.ResponseTypeKeys[variables.type]])
      ) {
        throw new Error(browser.i18n.getMessage('E_AnilistSearchResults'));
      }

      // Return results list.
      return body.data.Page[Enum.ResponseTypeKeys[variables.type]];
    }
    catch (e) {
      throw new Error(browser.i18n.getMessage('E_AnilistRequest', e.message));
    }
  }
}
