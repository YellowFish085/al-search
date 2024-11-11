const SettingsIntegrationOverlay = {
  setup() {
    return () => Vue.h('div', { id: 'page-settings__integration__overlay' }, [
      Vue.h('p', browser.i18n.getMessage('SETTINGS_INTEGRATION_OVERLAY_Title')),

      Vue.h(SettingsIntegrationOverlayX),

      Vue.h(SettingsIntegrationOverlayY),
    ]);
  },
};