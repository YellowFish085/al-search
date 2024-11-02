const CardCoverPlaceholder = {
  setup(props) {
    return () => Vue.h('div', { class: 'card-cover placeholder' }, [
      Vue.h('div', { class: 'cover' }),
      Vue.h('div', { class: 'title' }),
    ]);
  },
};