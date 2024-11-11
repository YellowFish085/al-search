const SearchSeason = {
  setup() {
    const seasons = [
      { value: '',                       text: browser.i18n.getMessage('SEARCH_SEASON_AllSeasons') },
      { value: Enum.SearchSeason.SPRING, text: browser.i18n.getMessage(`ENUM_SEASON_${Enum.SearchSeason.SPRING}`) },
      { value: Enum.SearchSeason.SUMMER, text: browser.i18n.getMessage(`ENUM_SEASON_${Enum.SearchSeason.SUMMER}`) },
      { value: Enum.SearchSeason.FALL,   text: browser.i18n.getMessage(`ENUM_SEASON_${Enum.SearchSeason.FALL}`) },
      { value: Enum.SearchSeason.WINTER, text: browser.i18n.getMessage(`ENUM_SEASON_${Enum.SearchSeason.WINTER}`) },
    ];

    return () => Vue.h('select',
      {
        class:    { 'active': store.search.season },
        disabled: store.searchState === 'loading' || ![Enum.SearchType.ANIME].includes(store.search.type),
        id:       'season-input',
        name:     'season_input',
        title:    browser.i18n.getMessage('SEARCH_SEASON_Title'),
        onChange(evt) {
          store.search.season = evt.target.value;

          document.dispatchEvent(new CustomEvent('search', { detail: 0 }));
        },
      },
      [
        seasons.map((season) => Vue.h('option', {
          selected: season.value === store.search.season, value: season.value,
        }, season.text)),
      ]
    );
  },
};