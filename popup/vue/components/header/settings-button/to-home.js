const HeaderSettingsButtonToHome = {
  setup() {
    return () => Vue.h('div', Vue.h(VueRouter.RouterLink, {
      class: ['header-settings-button', { 'small': store.search.q }],
      title: browser.i18n.getMessage('HEADER_SETTINGS_BUTTON_ToHome'),
      to:    { name: 'home' },
    }, Vue.h('span', { class: 'fas fa-chevron-left' })));
  },
};