import * as Enum from '@/utils/Enum';
import characters from '@/anilist/graphql/characters.graphql';
import media from '@/anilist/graphql/media.graphql';
import staff from '@/anilist/graphql/staff.graphql';
import studios from '@/anilist/graphql/studios.graphql';
import QueryUser from '@/anilist/graphql/user.graphql';

/**
 * Export queries.
 */
const QueriesSearch: { [key: string]: string } = {};

QueriesSearch[Enum.SearchType.ANIME] = media;
QueriesSearch[Enum.SearchType.MANGA] = media;
QueriesSearch[Enum.SearchType.STUDIOS] = studios;
QueriesSearch[Enum.SearchType.CHARACTERS] = characters;
QueriesSearch[Enum.SearchType.STAFF] = staff;

export {
  QueriesSearch,
  QueryUser,
};
