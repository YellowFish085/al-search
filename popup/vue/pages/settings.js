const PageSettings = {
  setup() {
    return () => Vue.h('section', { class: 'container', id: 'page-settings' }, [
      // User settings.
      Vue.h(SettingsUser),

      // Activity settings.
      Vue.h(SettingsActivity),

      // Integration settings.
      Vue.h(SettingsIntegration),

      // Search settings.
      Vue.h(SettingsSearch),

      // Theme settings.
      Vue.h(SettingsTheme),

      // Information.
      Vue.h(SettingsInformation),

      // About.
      Vue.h(SettingsAbout),
    ]);
  },
};
