const CardPartScore = {
  props: ['entry'],

  setup(props) {
    return () => [
      Vue.h('div', { class: 'score' }, [
        props.entry.averageScore > 74
          ? Vue.h('span', { class: 'far fa-smile' })
          : null,

        props.entry.averageScore <= 74 && props.entry.averageScore > 59
          ? Vue.h('span', { class: 'far fa-meh' })
          : null,

        props.entry.averageScore <= 59
          ? Vue.h('span', { class: 'far fa-frown' })
          : null,

        Vue.h('div', { class: 'percentage' }, `${props.entry.averageScore}%`),
      ]),
    ];
  },
};