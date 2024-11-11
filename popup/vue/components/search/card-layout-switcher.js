const CardLayoutSwitcher = {
  setup() {
    const layouts = [
      { value: Enum.CardLayout.COVER, icon: 'th' },
      { value: Enum.CardLayout.CHART, icon: 'th-large' },
      { value: Enum.CardLayout.TABLE, icon: 'th-list' },
    ];

    return () => Vue.h('div', { class: 'row', id: 'card-layout-switcher' }, [
      layouts.map((layout) => Vue.h(CardLayoutSwitcherItem, {
        icon:   layout.icon,
        layout: layout.value,
      })),
    ]);
  },
};