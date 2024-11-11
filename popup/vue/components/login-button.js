const LoginButton = {
  setup() {
    return () => Vue.h('button', {
      class: 'login-button btn btn-bg',
      title:  browser.i18n.getMessage('LOGIN_BUTTON_Label'),
      onClick() {
        document.querySelectorAll('.login-button').forEach((btn) => {
          btn.setAttribute('disabled', 'disabled');
        });

        browser.runtime.sendMessage({ code: 'AUTH' })
          .then((response) => {
            !response.error
              ? document.dispatchEvent(new CustomEvent('auth'))
              : Notifications.create('user', browser.i18n.getMessage('Error', response.error));
          });
      }
    }, browser.i18n.getMessage('LOGIN_BUTTON_Label'));
  },
};