const CardButtonPlaceholder = {
  setup() {
    return () => Vue.h('div', { class: 'card-button placeholder' }, [
      Vue.h('span', { class: 'name' }),
    ]);
  },
};