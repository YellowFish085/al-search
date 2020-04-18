import StorageHelper from '@/utils/StorageHelper';
import AniList from '@/anilist/AniList';
import * as Enum from '@/utils/Enum';

/**
 * Search something on AniList.
 */
async function search(variables: AniSearch.Search.Search, sendResponse: Function) {
  try {
    const accessToken = await StorageHelper.getAccessToken();
    const user = await StorageHelper.getUser();
    const client = new AniList(accessToken);

    const searchResult: AniSearch.Store.SearchResults = {
      loading: false,
      type: variables.type,
      results: await client.search(variables),
    };

    // If user is logged in and searching for an anime or a manga,
    // add personal lists results to the search results.
    if (user && [Enum.SearchType.ANIME, Enum.SearchType.MANGA].includes(variables.type)) {
      searchResult.resultsOnList = await client.search(variables, true);
    }

    sendResponse({ code: 'SEARCH_SUCCESS', searchResult });
  }
  catch (e) {
    sendResponse({ code: 'SEARCH_FAILED', message: e.message });
  }
}

/**
 * Search something on AniList and return the first result.
 *
 * This search is done without the user access token.
 */
async function searchSingle(variables: AniSearch.Search.Search, sendResponse: Function) {
  try {
    const client = new AniList();

    const searchResult: AniSearch.Store.SearchResults = {
      loading: false,
      type: variables.type,
      results: await client.search(variables),
    };

    const entry = searchResult.results![0] || null;

    sendResponse({ code: 'SEARCH_SUCCESS', entry });
  }
  catch (e) {
    sendResponse({ code: 'SEARCH_FAILED', message: e.message });
  }
}

export default {
  search,
  searchSingle,
};
