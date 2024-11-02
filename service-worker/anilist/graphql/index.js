import * as Enum from '../../../shared/enums-esm.js';

/**
 * Export queries.
 */
const QueriesSearch = {};

QueriesSearch[Enum.SearchType.ANIME] = `query (
  $page: Int = 1,
  $sort: [MediaSort] = [SEARCH_MATCH],
  $isAdult: Boolean = false,
  $search: String,
  $type: MediaType,
  $year: String,
  $season: MediaSeason,
  $onList: Boolean,
) {
  Page (page: $page, perPage: 20) {
    media(
      sort: $sort,
      isAdult: $isAdult,
      search: $search,
      type: $type,
      startDate_like: $year,
      season: $season,
      onList: $onList,
    ) {
      id
      siteUrl
      isAdult
      type
      title {
        userPreferred
      }
      description
      coverImage {
        large
        color
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      seasonYear
      season
      format
      status(version:2)
      episodes
      duration
      genres
      averageScore
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      mediaListEntry {
        id
        status
      }
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
            siteUrl
          }
        }
      }
    }
  }
}`;

QueriesSearch[Enum.SearchType.MANGA] = `query (
  $page: Int = 1,
  $sort: [MediaSort] = [SEARCH_MATCH],
  $isAdult: Boolean = false,
  $search: String,
  $type: MediaType,
  $year: String,
  $season: MediaSeason,
  $onList: Boolean,
) {
  Page (page: $page, perPage: 20) {
    media(
      sort: $sort,
      isAdult: $isAdult,
      search: $search,
      type: $type,
      startDate_like: $year,
      season: $season,
      onList: $onList,
    ) {
      id
      siteUrl
      isAdult
      type
      title {
        userPreferred
      }
      description
      coverImage {
        large
        color
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      format
      status(version:2)
      chapters
      volumes
      genres
      averageScore
      mediaListEntry {
        id
        status
      }
    }
  }
}`;

QueriesSearch[Enum.SearchType.STUDIOS] = `query (
  $page: Int = 1,
  $sort: [StudioSort] = [SEARCH_MATCH],
  $search: String,
) {
  Page (page: $page, perPage: 5) {
    studios (
      sort: $sort,
      search: $search
    ) {
      id
      siteUrl
      name
    }
  }
}`;

QueriesSearch[Enum.SearchType.CHARACTERS] = `query (
  $page: Int = 1,
  $sort: [CharacterSort] = [SEARCH_MATCH],
  $search: String,
) {
  Page (page: $page, perPage: 20) {
    characters (
      sort: $sort,
      search: $search,
    ) {
      id
      siteUrl
      name {
        full
      }
      image {
        large
      }
    }
  }
}`;

QueriesSearch[Enum.SearchType.STAFF] = `query (
  $page: Int = 1,
  $sort: [StaffSort] = [SEARCH_MATCH],
  $search: String
) {
  Page (page: $page, perPage: 20) {
    staff (
      sort: $sort,
      search: $search
    ) {
      id
      siteUrl
      name {
        full
      }
      image {
        large
      }
    }
  }
}`;

const QueryUser = `query {
  Viewer {
    id
    name
    avatar {
      medium
    }
    siteUrl
  }
}`;

export {
  QueriesSearch,
  QueryUser,
};
