import QueryUser, { UserSchemaCheck } from '@/anilist/graphql/user';

export default class AniList {
  readonly token: string | null;

  constructor(token?: string) {
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
  public async user(): Promise<AniSearch.AniList.Schema.User> {
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
        return body.data.Viewer as AniSearch.AniList.Schema.User;
      }

      throw new Error(`Anilist request failed: Response does not contains user data. Response: ${JSON.stringify(body)}`);
    }
    catch (e) {
      throw new Error(`Anilist request failed: ${e.message}`);
    }
  }
}
