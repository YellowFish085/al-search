const SettingSelect = {
  props: ['label', 'name', 'options', 'settingsKey', 'value'],

  setup(props) {
    return () => [
      Vue.h('select',
        {
          checked: props.value,
          id:      props.name,
          name:    props.name,
          onChange(evt) {
            DotObject.set(store, `settings.${props.settingsKey}`, evt.target.value);

            browser.runtime.sendMessage({ code: 'STORE_SETTINGS', settings: deepClone(store.settings) })
              .then((response) => {
                if (response.error) {
                  Notifications.create('settings', browser.i18n.getMessage('Error', response.error));
                }
              });
          },
        },
        [
          props.options.map((option) => Vue.h('option', {
            selected: option.value === props.value, value: option.value,
          }, option.text)),
        ]
      ),

      Vue.h('label', { for: props.name }, props.label),
    ];
  },
};