import * as Enum from '@/utils/Enum';

/**
 * Query for media (anime & manga) search.
 */
const media = `
query (
  $page: Int = 1,
  $sort: [MediaSort] = [SCORE_DESC,POPULARITY_DESC],
  $isAdult: Boolean,
  $search: String,
  $type: MediaType,
  $year: String,
  $season: MediaSeason,
) {
  Page (page: $page, perPage: 20) {
    media(
      sort: $sort,
      isAdult: $isAdult,
      search: $search,
      type: $type,
      startDate_like: $year,
      season: $season,
    ) {
      id
      isAdult
      type
      title {
        userPreferred
      }
      description
      bannerImage
      coverImage {
        large: extraLarge
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
      studios(isMain: true) {
        edges {
          isMain
          node {
            id
            name
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
  $sort: [StudioSort] = [FAVOURITES_DESC],
  $search: String,
) {
  Page (page: $page, perPage: 5) {
    studios (
      sort: $sort,
      search: $search
    ) {
      id
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
            title {
              userPreferred
            }
            description
            bannerImage
            coverImage {
              large: extraLarge
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
  $sort: [CharacterSort] = [FAVOURITES_DESC],
  $search: String,
) {
  Page (page: $page, perPage: 20) {
    characters (
      sort: $sort,
      search: $search,
    ) {
      id
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
  $sort: [StaffSort] = [FAVOURITES_DESC],
  $search: String
) {
  Page (page: $page, perPage: 20) {
    staff (
      sort: $sort,
      search: $search
    ) {
      id
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
