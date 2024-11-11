const HeaderSettingsButton = {
  setup() {
    const r = VueRouter.useRouter();

    return () => Vue.h(Vue.Transition,
      {
        appear: true,
        mode:   'out-in',
        name:   'header-settings-button',
      },
      r.currentRoute.value.name === 'settings' ? Vue.h(HeaderSettingsButtonToHome) : Vue.h(HeaderSettingsButtonToSettings),
    );
  },
};