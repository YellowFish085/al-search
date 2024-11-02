const PageHome = {
  setup() {
    return () => Vue.h('section', { class: 'container', id: 'page-home' }, [
      Vue.h('h1', browser.i18n.getMessage('HOME_Title')),

      // Activity feed.
      Vue.h(ActivityFeed),

      // Clear activities button.
      store.activities.length ? Vue.h(ActivityClearButton) : null,
    ]);
  },
};