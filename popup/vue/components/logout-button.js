const LogoutButton = {
  setup() {
    return () => Vue.h('button', {
      class: 'btn btn-bg btn--red',
      title:  browser.i18n.getMessage('LOGOUT_BUTTON_Label'),
      onClick() {
        browser.runtime.sendMessage({ code: 'LOGOUT' })
          .then((response) => {
            !response.error
              ? document.dispatchEvent(new CustomEvent('logout'))
              : Notifications.create('user', browser.i18n.getMessage('Error', response.error));
          });
      }
    }, browser.i18n.getMessage('LOGOUT_BUTTON_Label'));
  },
};