const StaffCard = {
  props: {
    entry: null,
  },

  setup(props) {
    return () => store.searchState === 'loading'
      ? Vue.h(CardCoverPlaceholder)
      : Vue.h(CardCover, { entry: props.entry, type: Enum.SearchType.STAFF });
  },
};