import * as Enum from '@/utils/Enum';

/**
 * Query for media (anime & manga) search.
 */
const media = `
query (
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
      bannerImage
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
      season
      format
      status
      genres
      averageScore
      popularity
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
}
`;

/**
 * Query for studios search.
 */
const studios = `
query (
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
      media (
        isMain: true,
        sort: POPULARITY_DESC,
        perPage: 3,
      ) {
        edges {
          node {
            id
            isAdult
            type
            siteUrl
            title {
              userPreferred
            }
            description
            bannerImage
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
            season
            format
            status
            genres
            averageScore
            popularity
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
            mediaListEntry {
              id
              status
            }
          }
        }
      }
    }
  }
}
`;

/**
 * Query for characters search.
 */
const characters = `
query (
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
}
`;

/**
 * Query for staff search.
 */
const staff = `
query (
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
}
`;

/**
 * Export queries.
 */
const queries: { [key: string]: string } = {};

queries[Enum.SearchType.ANIME] = media;
queries[Enum.SearchType.MANGA] = media;
queries[Enum.SearchType.STUDIOS] = studios;
queries[Enum.SearchType.CHARACTERS] = characters;
queries[Enum.SearchType.STAFF] = staff;

export default queries;
