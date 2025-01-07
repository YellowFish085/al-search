const SearchInputInput = {
  setup() {
    document.addEventListener('search-done', (evt) => {
      // Give back focus once search is done.
      setTimeout(() => {
        document.getElementById('search-input__input').focus();
      }, 100);
    });

    return () => Vue.h('input', {
      autocomplete: 'off',
      autofocus:    'on',
      disabled:     store.searchState === 'loading',
      id:           'search-input__input',
      name:         'search_input',
      placeholder:  browser.i18n.getMessage('SEARCH_INPUT_Placeholder'),
      ref:          'search',
      type:         'search',
      value:        store.search.q,
      onInput(evt) {
        store.search.q = evt.target.value;

        document.dispatchEvent(new CustomEvent('search'));
      },
      onkeyup(evt) {
        if (evt.key === 'Enter' || evt.keyCode === 13) {
          document.dispatchEvent(new CustomEvent('search'));
        }
      },
    });
  }
};