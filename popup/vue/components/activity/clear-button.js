const ActivityClearButton = {
  setup() {
    return () => Vue.h('button', {
      class: 'btn btn-border',
      title: browser.i18n.getMessage('ACTIVITY_Clear'),
      onClick() {
        browser.runtime.sendMessage({ code: 'CLEAR_ACTIVITY_FEED' })
          .then((response) => {
            !response.error
              ? document.dispatchEvent(new CustomEvent('activity-feed-cleared'))
              : Notifications.create('activity_feed', browser.i18n.getMessage('Error', response.error));
          });
      }
    }, browser.i18n.getMessage('ACTIVITY_Clear'));
  },
};