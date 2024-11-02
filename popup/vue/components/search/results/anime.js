const SearchResultsAnime = {
  setup() {
    const firstList  = store.settings.search.onListFirst                ? 'resultsOnList' : 'results';
    const secondList = store.user && !store.settings.search.onListFirst ? 'resultsOnList' : 'results';

    return () => [
      store.user
        ? [
          // First list.
          Vue.h('h2', browser.i18n.getMessage(store.settings.search.onListFirst ? 'SEARCH_ResultsOnList' : 'SEARCH_GlobalResults')),

          Vue.h('div', { class: `search-results--${Enum.SearchType.ANIME} search-results--${store.settings.search.layout}` },
            store.searchState === 'loading'
              ? [0, 1, 2].map((entry) =>
                Vue.h(Vue.Transition, { appear: true, name: 'card-appear' }, Vue.h(AnimeCard))
              )
              : store.searchResults[firstList].map((entry) => Vue.h(AnimeCard, { entry: entry })),
          ),

          // Second/default list.
          Vue.h('h2', browser.i18n.getMessage(!store.settings.search.onListFirst ? 'SEARCH_ResultsOnList' : 'SEARCH_GlobalResults')),
        ]
        : null,

      Vue.h('div', { class: `search-results--${Enum.SearchType.ANIME} search-results--${store.settings.search.layout}` }, [
        store.searchState === 'loading'
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8].map((entry) =>
            Vue.h(Vue.Transition, { appear: true, name: 'card-appear' }, Vue.h(AnimeCard))
          )
          : store.searchResults[secondList].map((entry) => Vue.h(AnimeCard, { entry: entry })),
      ]),
    ];
  },
};