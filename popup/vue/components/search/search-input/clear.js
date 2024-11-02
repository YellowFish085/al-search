const SearchInputClearButton = {
  setup() {
    return () => Vue.h('button', {
      class: { 'hidden': store.search.q === '' },
      id:    'search-input__clear',
      title: browser.i18n.getMessage('SEARCH_INPUT_Clear'),
      onClick(evt) { store.search.q = ''; },
    }, Vue.h('span', { class: 'fa fa-times' }));
  }
};