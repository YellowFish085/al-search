const SearchType = {
  setup() {
    const types = [
      { value: Enum.SearchType.ANIME,      text: browser.i18n.getMessage(`ENUM_TYPE_${Enum.SearchType.ANIME}`) },
      { value: Enum.SearchType.MANGA,      text: browser.i18n.getMessage(`ENUM_TYPE_${Enum.SearchType.MANGA}`) },
      { value: Enum.SearchType.STUDIOS,    text: browser.i18n.getMessage(`ENUM_TYPE_${Enum.SearchType.STUDIOS}`) },
      { value: Enum.SearchType.CHARACTERS, text: browser.i18n.getMessage(`ENUM_TYPE_${Enum.SearchType.CHARACTERS}`) },
      { value: Enum.SearchType.STAFF,      text: browser.i18n.getMessage(`ENUM_TYPE_${Enum.SearchType.STAFF}`) },
    ];

    return () => Vue.h('div', { id: 'type-input' }, types.map((type) => [
      Vue.h('input',
        {
          checked:  type.value === store.search.type,
          disabled: store.searchState === 'loading',
          id:       `type-input__${type.value}`,
          name:     'type_input',
          type:     'radio',
          value:    type.value,
          onChange(evt) {
            // Note: Search results are displayed based on search type, changing the value will
            // change the displayed search results list. To prevent invalid state (for instance
            // displaying the studios results list with anime data when switching from Anime to
            // Studios types) we set the search state to `loading` before it actually begins.
            store.searchState = 'loading';

            store.search.type = evt.target.value;

            // If type is not anime, clear season input.
            if (![Enum.SearchType.ANIME].includes(store.search.type)) {
              store.search.season = '';
            }

            // If type is not manga, clear year input too.
            if (![Enum.SearchType.MANGA].includes(store.search.type)) {
              store.search.year = '';
            }

            document.dispatchEvent(new CustomEvent('search', { detail: 0 }));
          },
        }
      ),

      Vue.h('label', {
        class: { 'active': store.search.type === type.value },
        for:   `type-input__${type.value}`,
        id:    `type-input__${type.value}__label`,
      }, type.text),
    ]));
  },
};