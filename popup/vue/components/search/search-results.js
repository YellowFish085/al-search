const SearchResults = {
  setup() {
    return () => Vue.h('div',
      {
        class: { searching: store.searchState === 'loading' },
        id:    'search-results'
      },
      [
        Enum.SearchType.ANIME      === store.search.type ? Vue.h(SearchResultsAnime)      : null,
        Enum.SearchType.MANGA      === store.search.type ? Vue.h(SearchResultsManga)      : null,
        Enum.SearchType.STUDIOS    === store.search.type ? Vue.h(SearchResultsStudios)    : null,
        Enum.SearchType.CHARACTERS === store.search.type ? Vue.h(SearchResultsCharacters) : null,
        Enum.SearchType.STAFF      === store.search.type ? Vue.h(SearchResultsStaff)      : null,
      ]
    );
  },
};