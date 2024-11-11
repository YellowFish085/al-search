const SettingsIntegrationOverlayX = {
  setup() {
    const positions = [
      { value: Enum.WebIntegrationX.LEFT,  text: browser.i18n.getMessage(`ENUM_WEBINTEGRATIONX_${Enum.WebIntegrationX.LEFT}`) },
      { value: Enum.WebIntegrationX.RIGHT, text: browser.i18n.getMessage(`ENUM_WEBINTEGRATIONX_${Enum.WebIntegrationX.RIGHT}`) },
    ];

    return () => Vue.h(SettingSelect, {
      label:       browser.i18n.getMessage('SETTINGS_INTEGRATION_OVERLAY_X_Label'),
      name:        'web_integration_x_input',
      settingsKey: 'integration.overlay.x',
      value:       store.settings.integration.overlay.x,
      options:     positions,
    });
  },
};