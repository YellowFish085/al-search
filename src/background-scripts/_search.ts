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

    // Set user options if available.
    if (user) {
      client.setOptions({
        displayAdultContent: user.options.displayAdultContent,
      });
    }

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

export default {
  search,
};
