const PageSearch = {
  setup() {
    return () => Vue.h('section', { class: 'container', id: 'page-search' }, [
      Vue.h('div', { class: 'page-title row' }, [
        Vue.h('h1', browser.i18n.getMessage('SEARCH_Title')),

        // Layout switcher.
        [Enum.SearchType.ANIME, Enum.SearchType.MANGA].includes(store.search.type)
          ? Vue.h(CardLayoutSwitcher)
          : null,
      ]),

      // Search results.
      Vue.h(SearchResults),
    ]);
  },
};