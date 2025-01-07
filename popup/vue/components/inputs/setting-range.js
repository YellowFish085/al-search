const SettingRange = {
  props: ['label', 'max', 'min', 'name', 'settingsKey', 'value'],

  setup(props) {
    return () => Vue.h('div', { class: 'setting-range' }, [
      Vue.h('label', { for: props.name }, props.label),

      Vue.h('span', { class: 'setting-range__wrapper' }, [
        Vue.h('input', {
          id:      props.name,
          max:     props.max,
          min:     props.min,
          name:    props.name,
          type:    'range',
          value:   props.value,
          onInput(evt) {
            DotObject.set(store, `settings.${props.settingsKey}`, evt.target.value);

            browser.runtime.sendMessage({ code: 'STORE_SETTINGS', settings: deepClone(store.settings) })
              .then((response) => {
                if (response.error) {
                  Notifications.create('settings', browser.i18n.getMessage('Error', response.error));
                }
              });
          },
        }),

        Vue.h('span', `${DotObject.get(store, `settings.${props.settingsKey}`)} ms`),
      ]),
    ]);
  },
};