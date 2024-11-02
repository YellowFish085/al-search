const SearchInputUnderline = {
  setup() {
    return () => Vue.h('div', {
      class: { 'hidden': store.search.q === '' },
      id:    'search-input__underline',
    });
  }
};