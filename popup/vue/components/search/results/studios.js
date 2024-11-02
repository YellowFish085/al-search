const SearchResultsStudios = {
  setup() {
    return () => [
      Vue.h('div', { class: `search-results--${Enum.SearchType.STUDIOS}` }, [
        store.searchState === 'loading'
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((entry) =>
            Vue.h(Vue.Transition, { appear: true, name: 'card-appear' }, Vue.h(StudioCard))
          )
          : store.searchResults.results.map((entry) => Vue.h(StudioCard, { entry: entry })),
      ])
    ];
  },
};