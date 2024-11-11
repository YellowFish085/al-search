const SettingsUser = {
  setup() {
    return () => [
      Vue.h('h2', browser.i18n.getMessage('SETTINGS_USER_Title')),

      Vue.h('div', { class: 'card', id: 'page-settings__user' },
        Vue.h(Vue.Transition, { name: 'user-translate' },
          store.user ? Vue.h(SettingsUserLogedIn) : Vue.h(SettingsUserLogedOut)
        )
      ),
    ];
  },
};