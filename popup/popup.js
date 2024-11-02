document.addEventListener('DOMContentLoaded', function () {
  const app = Vue.createApp({
    setup() {
      return () => Vue.h('div',
        {
          class: { 'searching': store.searchState === 'loading' },
          id:    'app-container',
        },
        [
          // Header.
          Vue.h(Header),

          // Page.
          Vue.h('div', { class: 'content' }, Vue.h(VueRouter.RouterView)),
        ]
      );
    },
  })
    .use(router)
    .mount('#app');
});