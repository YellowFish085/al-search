import StorageHelper from '@/utils/StorageHelper';
import AniList from '@/anilist/AniList';

/**
 * Search something on AniList.
 */
async function search(variables: AniSearch.Search.Search, sendResponse: Function) {
  try {
    const accessToken = await StorageHelper.getAccessToken();
    const user = await StorageHelper.getUser();
    const client = new AniList(accessToken);

    if (user) {
      client.setOptions(user.options as AniSearch.Search.Options);
    }

    const results = await client.search(variables);

    sendResponse({ code: 'SEARCH_SUCCESS', results });
  }
  catch (e) {
    sendResponse({ code: 'SEARCH_FAILED', message: e.message });
  }
}

export default {
  search,
};
