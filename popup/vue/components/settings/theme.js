const SettingsTheme = {
  setup() {
    const themes = [
      { value: Enum.Theme.DEFAULT,  text: browser.i18n.getMessage('ThemeDefault') },
      { value: Enum.Theme.DARK,     text: browser.i18n.getMessage('ThemeDark') },
      { value: Enum.Theme.CONTRAST, text: browser.i18n.getMessage('ThemeContrast') },
    ];

    return () => [
      Vue.h('h2', browser.i18n.getMessage('SETTINGS_THEME_Title')),

      Vue.h('div', { class: 'card', id: "page-settings__theme" }, [
        Vue.h('div', { id: 'page-settings__theme__themes' },
          themes.map((theme) => Vue.h(SettingsThemeItem, {theme: theme}))
        ),
      ]),
    ];
  },
};