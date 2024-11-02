const RefreshUserButton = {
  setup() {
    return () => Vue.h('button', {
      class: 'refresh-user-button btn btn-bg',
      title:  browser.i18n.getMessage('REFRESH_USER_BUTTON_Label'),
      onClick() {
        document.querySelectorAll('.refresh-user-button').forEach((btn) => {
          btn.setAttribute('disabled', 'disabled');
        });

        browser.runtime.sendMessage({ code: 'REFRESH_USER' })
          .then((response) => {
            document.querySelectorAll('.refresh-user-button').forEach((btn) => {
              btn.removeAttribute('disabled');
            });

            !response.error
              ? document.dispatchEvent(new CustomEvent('refresh-user'))
              : Notifications.create('user', browser.i18n.getMessage('Error', response.error));
          });
      }
    }, browser.i18n.getMessage('REFRESH_USER_BUTTON_Label'));
  },
};