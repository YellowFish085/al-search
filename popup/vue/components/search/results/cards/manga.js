const MangaCard = {
  props: {
    entry: null,
  },

  setup(props) {
    return () => [
      store.settings.search.layout === Enum.CardLayout.CHART
        ? !props.entry ? Vue.h(CardChartPlaceholder) : Vue.h(CardChart, { entry: props.entry })
        : null,

      store.settings.search.layout === Enum.CardLayout.COVER
        ? !props.entry ? Vue.h(CardCoverPlaceholder) : Vue.h(CardCover, { entry: props.entry, type: Enum.SearchType.MANGA })
        : null,

      store.settings.search.layout === Enum.CardLayout.TABLE
        ? !props.entry ? Vue.h(CardTablePlaceholder) : Vue.h(CardTable, { entry: props.entry })
        : null,
    ];
  },
};

