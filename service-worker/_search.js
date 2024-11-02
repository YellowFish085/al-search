import * as Enum from '../shared/enums-esm.js';
import AniList from './anilist/anilist.js';
import Storage from './utils/storage.js';

export default class Search {
  /**
   * Search something on AniList.
   */
  static async search(variables) {
    const user   = await Storage.get(Storage.KEYS.USER);
    const client = await (new AniList()).authenticate();

    const searchResult = {
      type:    variables.type,
      results: await client.search(variables, false),
    };

    // If user is logged in and searching for an anime or a manga, add personal lists results.
    if (user && [Enum.SearchType.ANIME, Enum.SearchType.MANGA].includes(variables.type)) {
      searchResult.resultsOnList = await client.search(variables, true);
    }

    return searchResult;
  }

  /**
   * Search something on AniList and return the first result.
   */
  static async searchSingle(variables) {
    const client = new AniList();

    const searchResult = {
      type:    variables.type,
      results: await client.search(variables),
    };

    return searchResult.results && searchResult.results[0]
      ? searchResult.results[0]
      : null;
  }
}