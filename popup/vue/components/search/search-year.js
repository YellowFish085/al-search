const SearchYear = {
  setup() {
    const years = new Array(new Date().getFullYear() - 1950 + 1)
      .fill(undefined)
      .map((value, index) => index + 1950)
      .reverse();

    return () => Vue.h('select',
      {
        class:    { 'active': store.search.year },
        disabled: store.searchState === 'loading' || ![Enum.SearchType.ANIME, Enum.SearchType.MANGA].includes(store.search.type),
        id:       'year-input',
        name:     'year_input',
        title:    browser.i18n.getMessage('SEARCH_YEAR_Title'),
        onChange(evt) {
          store.search.year = evt.target.value;

          document.dispatchEvent(new CustomEvent('search', { detail: 0 }));
        },
      },
      [
        Vue.h('option', {
          selected: !store.search.year, value: '',
        }, browser.i18n.getMessage('SEARCH_YEAR_AllYears')),

        years.map((year) => Vue.h('option', {
          selected: year === store.search.year, value: year,
        }, year)),
      ]
    );
  },
};