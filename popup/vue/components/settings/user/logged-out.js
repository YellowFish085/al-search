const SettingsUserLogedOut = {
  setup() {
    return () => [
      Vue.h('h3', browser.i18n.getMessage('SETTINGS_USER_LoggedOut')),
      Vue.h('p', browser.i18n.getMessage('SETTINGS_USER_LoggedOutDescription')),

      Vue.h('div', { id: 'page-settings__user__actions' }, [
        Vue.h(LoginButton),
      ]),
    ];
  },
};