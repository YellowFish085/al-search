import QueriesSearch from '@/anilist/graphql/search';
import QueryUser, { UserSchemaCheck } from '@/anilist/graphql/user';
import * as Enum from '@/utils/Enum';

export default class AniList {
  readonly token: string | null;

  private options: AniSearch.Search.Options;

  constructor(token?: string | null) {
    this.token = token || null;
    this.options = {
      displayAdultContent: false,
    };
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
   * Set options for requests.
   */
  public setOptions(options: AniSearch.Search.Options): void {
    this.options = options;
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

      throw new Error(`AniList request failed: Response does not contains user data. Response: ${JSON.stringify(body)}`);
    }
    catch (e) {
      throw new Error(`AniList request failed: ${e.message}`);
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
            isAdult: this.options.displayAdultContent,
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
        throw new Error('Invalid search results from AniList');
      }

      // Return results list.
      return body.data.Page[Enum.ResponseTypeKeys[variables.type]];
    }
    catch (e) {
      throw new Error(`AniList request failed: ${e.message}`);
    }
  }
}
