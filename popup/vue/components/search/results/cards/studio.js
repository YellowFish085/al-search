const StudioCard = {
  props: {
    entry: null,
  },

  setup(props) {
    return () => store.searchState === 'loading'
      ? Vue.h(CardButtonPlaceholder)
      : Vue.h(CardButton, {entry: props.entry});
  },
};