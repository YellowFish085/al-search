const SearchResultsCharacters = {
  setup() {
    return () => [
      Vue.h('div', { class: `search-results--${Enum.SearchType.CHARACTERS}` }, [
        store.searchState === 'loading'
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8].map((entry) =>
            Vue.h(Vue.Transition, { appear: true, name: 'card-appear' }, Vue.h(CharacterCard))
          )
          : store.searchResults.results.map((entry) => Vue.h(CharacterCard, { entry: entry })),
      ])
    ];
  },
};