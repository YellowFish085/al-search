const CardLayoutSwitcherItem = {
  props: ['layout', 'icon'],

  setup(props) {
    return () => Vue.h('button', {
      class:        { 'active': store.settings.search.layout === props.layout },
      'data-value': props.layout,
      id:           `card-layout-${props.layout}`,
      onClick(evt) {
        store.settings.search.layout = props.layout;

        browser.runtime.sendMessage({ code: 'STORE_SETTINGS', settings: deepClone(store.settings) })
          .then((response) => {
            if (response.error) {
              Notifications.create('settings', browser.i18n.getMessage('Error', response.error));
            }
          });
      },
    }, Vue.h('span', { class: `fas fa-${props.icon}` }));
  },
};