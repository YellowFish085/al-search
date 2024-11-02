const CardChartPlaceholder = {
  setup(props) {
    return () => Vue.h('div', { class: 'card-chart placeholder' }, [
      Vue.h('div', { class: 'cover' }),
      Vue.h('div', { class: 'description' },
        [0, 1, 2].map(() => Vue.h('div'))
      ),
    ]);
  },
};