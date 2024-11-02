const SettingsSearch = {
  setup() {
    return () => [
      Vue.h('h2', browser.i18n.getMessage('SETTINGS_SEARCH_Title')),

      Vue.h('div', { class: 'card', id: 'page-settings__search' }, [
        Vue.h(SettingCheckbox, {
          label:       browser.i18n.getMessage('SETTINGS_SEARCH_ResultsOnListFirstLabel'),
          name:        'search_on_list_first_input',
          settingsKey: 'search.onListFirst',
          value:       store.settings.search.onListFirst,
        }),

        Vue.h('p', browser.i18n.getMessage('SETTINGS_SEARCH_ResultsOnListFirstDescription')),
      ]),
    ];
  },
};