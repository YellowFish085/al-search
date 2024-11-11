const SearchInput = {
  setup() {
    return () => Vue.h('div',
      {
        class: { 'active': store.search.q },
        id:    'search-input'
      },
      [
        // Clear button.
        Vue.h(SearchInputClearButton),

        // Input.
        Vue.h(SearchInputInput),

        // Underline.
        Vue.h(SearchInputUnderline),
      ]
    );
  },
};