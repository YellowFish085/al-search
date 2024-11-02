const SettingsIntegration = {
  setup() {
    return () => [
      Vue.h('h2', browser.i18n.getMessage('SETTINGS_INTEGRATION_Title')),

      Vue.h('div', { class: 'card', id: 'page-settings__integration' }, [
        // Web integration.
        Vue.h(SettingCheckbox, {
          label:       browser.i18n.getMessage('SETTINGS_INTEGRATION_WebEnabledLabel'),
          name:        'web_integration_enabled_input',
          settingsKey: 'integration.webEnabled',
          value:       store.settings.integration.webEnabled,
        }),

        // Web integration settings.
        store.settings.integration.webEnabled ? Vue.h(SettingsIntegrationInPage) : null,

        Vue.h('p', { innerHTML: browser.i18n.getMessage('SETTINGS_INTEGRATION_WebEnabledDescription') }),

        // Contextual menu.
        Vue.h(SettingCheckbox, {
          label:       browser.i18n.getMessage('SETTINGS_INTEGRATION_ContextualMenuEnabledLabel'),
          name:        'contextual_menu_enabled_input',
          settingsKey: 'integration.menusEnabled',
          value:       store.settings.integration.menusEnabled,
        }),

        Vue.h('p', { innerHTML: browser.i18n.getMessage('SETTINGS_INTEGRATION_ContextualMenuEnabledDescription') }),
      ]),
    ];
  },
};