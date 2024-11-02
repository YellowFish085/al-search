const SettingCheckbox = {
  props: ['label', 'name', 'settingsKey', 'value'],

  setup(props) {
    return () => Vue.h('div', { class: 'setting-checkbox' }, [
      Vue.h('input', {
        checked: props.value,
        id:      props.name,
        name:    props.name,
        type:    'checkbox',
        onChange(evt) {
          DotObject.set(store, `settings.${props.settingsKey}`, evt.target.checked);

          browser.runtime.sendMessage({ code: 'STORE_SETTINGS', settings: deepClone(store.settings) })
            .then((response) => {
              if (response.error) {
                Notifications.create('settings', browser.i18n.getMessage('Error', response.error));
              }
            });
        },
      }),

      Vue.h('label', { for: props.name }, props.label),
    ]);
  },
};