const SettingsActivity = {
  setup() {
    return () => [
      Vue.h('h2', browser.i18n.getMessage('SETTINGS_ACTIVITY_Title')),

      Vue.h('div', { class: 'card', id: 'page-settings__activity' }, [
        Vue.h('div', { class: 'row' }, [
          Vue.h('div', [
            // Save search checkbox.
            Vue.h(SettingCheckbox, {
              label:       browser.i18n.getMessage('SETTINGS_ACTIVITY_SaveSearch'),
              name:        'activity_enable_search_input',
              settingsKey: 'activity.search',
              value:       store.settings.activity.search,
            }),

            // Save visited pages checkbox.
            Vue.h(SettingCheckbox, {
              label:       browser.i18n.getMessage('SETTINGS_ACTIVITY_SaveVisitedPages'),
              name:        'activity_enable_visited_page_input',
              settingsKey: 'activity.visitedPages',
              value:       store.settings.activity.visitedPages,
            }),
          ]),

          // Clear activity button.
          Vue.h('div', Vue.h(ActivityClearButton)),
        ]),

        // Description.
        Vue.h('p', { innerHTML: browser.i18n.getMessage('SETTINGS_ACTIVITY_Description') }),
      ]),
    ];
  },
};