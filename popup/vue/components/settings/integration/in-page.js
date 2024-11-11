const SettingsIntegrationInPage = {
  setup() {
    return () => Vue.h('div', { id: 'page-settings__integration__in-page' }, [
      Vue.h(SettingCheckbox, {
        label:       browser.i18n.getMessage('SETTINGS_INTEGRATION_IN_PAGE_Label'),
        name:        'web_integration_near_title_input',
        settingsKey: 'integration.overlay.inPage',
        value:       store.settings.integration.overlay.inPage,
      }),

      !store.settings.integration.overlay.inPage ? Vue.h(SettingsIntegrationOverlay) : null,
    ]);
  },
};