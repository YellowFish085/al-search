const CardPartOnListStatus = {
  props: ['entry'],

  setup(props) {
    return () => props.entry.mediaListEntry && props.entry.mediaListEntry.status
      ? Vue.h('div', {
        class: `list-status ${props.entry.mediaListEntry.status}`,
        title: props.entry.mediaListEntry.status.toLowerCase(),
      })
      : null;
  },
};