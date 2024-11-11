const Header = {
  setup() {
    return () => Vue.h('div', { id: 'header' }, [
      Vue.h('div', { class: 'container' }, [
        Vue.h('div', { class: 'row' }, [
          // Settings button.
          Vue.h('div', Vue.h(HeaderSettingsButton)),

          // Search input.
          Vue.h('div', Vue.h(SearchInput)),

          // Authenticated user.
          Vue.h('div', store.user ? Vue.h(UserAvatar) : null),
        ]),
      ]),

      Vue.h('div', { class: 'container' }, [
        Vue.h('div', { class: 'row' }, [
          // Search year input.
          Vue.h('div', Vue.h(SearchYear)),

          // Search type input.
          Vue.h('div', Vue.h(SearchType)),

          // Search season input.
          Vue.h('div', Vue.h(SearchSeason)),
        ])
      ])
    ]);
  },
};