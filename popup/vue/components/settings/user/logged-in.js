const SettingsUserLogedIn = {
  setup() {
    return () => [
      Vue.h('div', { class: 'row' }, [
        Vue.h(UserAvatar, { size: 'lg' }),

        Vue.h('span', { innerHTML: browser.i18n.getMessage('SETTINGS_USER_LoggedInAs', store.user.name) }),
      ]),

      Vue.h('div', { id: 'page-settings__user__actions' }, [
        Vue.h(RefreshUserButton),
        Vue.h(LogoutButton),
      ]),
    ];
  },
};