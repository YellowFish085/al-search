const SettingsThemeItem = {
  props: ['theme'],

  setup(props) {
    return () => Vue.h('div', { class: 'theme-input'}, [
      Vue.h('input', {
        id:   `theme-input_${props.theme.value}`,
        name: 'theme_input',
        type: 'radio',
        value: props.theme.value,
        onChange(evt) {
          store.settings.theme = evt.target.value;

          browser.runtime.sendMessage({ code: 'STORE_SETTINGS', settings: deepClone(store.settings) })
            .then((response) => {
              if (response.error) {
                Notifications.create('settings', browser.i18n.getMessage('Error', response.error));
              }
            });
        }
      }),

      Vue.h('label', {
        class: props.theme.value,
        for:  `theme-input_${props.theme.value}`,
        title: props.theme.text,
      }, 'A'),
    ]);
  },
};