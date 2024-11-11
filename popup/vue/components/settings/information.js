const SettingsInformation = {
  setup() {
    return () => [
      Vue.h('h2', browser.i18n.getMessage('SETTINGS_INFORMATION_Title')),

      Vue.h('div', { class: 'card', id: "page-settings__information" }, [
        Vue.h('h3', browser.i18n.getMessage('SETTINGS_INFORMATION_Data')),
        Vue.h('p', browser.i18n.getMessage('SETTINGS_INFORMATION_DataDescription')),

        Vue.h('h3', browser.i18n.getMessage('SETTINGS_INFORMATION_Activity')),
        Vue.h('p', { innerHTML: browser.i18n.getMessage('SETTINGS_INFORMATION_ActivityDescription') }),
      ]),
    ];
  },
};