const CardTablePlaceholder = {
  setup(props) {
    return () => Vue.h('div', { class: 'card-table placeholder' }, [
      Vue.h('div', { class: 'image-link' }),
      Vue.h('div', { class: 'card-content' }, [
        [0, 1].map(() => Vue.h('div')),
      ]),
    ]);
  },
};