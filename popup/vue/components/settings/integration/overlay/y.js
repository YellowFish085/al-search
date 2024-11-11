const SettingsIntegrationOverlayY = {
  setup() {
    const positions = [
      {value: Enum.WebIntegrationY.TOP,    text: browser.i18n.getMessage(`ENUM_WEBINTEGRATIONY_${Enum.WebIntegrationY.TOP}`)},
      {value: Enum.WebIntegrationY.CENTER, text: browser.i18n.getMessage(`ENUM_WEBINTEGRATIONY_${Enum.WebIntegrationY.CENTER}`)},
      {value: Enum.WebIntegrationY.BOTTOM, text: browser.i18n.getMessage(`ENUM_WEBINTEGRATIONY_${Enum.WebIntegrationY.BOTTOM}`)},
    ];

    return () => Vue.h(SettingSelect, {
      label:       browser.i18n.getMessage('SETTINGS_INTEGRATION_OVERLAY_Y_Label'),
      name:        'web_integration_y_input',
      settingsKey: 'integration.overlay.y',
      value:       store.settings.integration.overlay.y,
      options:     positions,
    });
  },
};