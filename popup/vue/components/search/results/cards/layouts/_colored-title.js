const CardPartColoredTitle = {
  props: ['entry'],

  setup(props) {
    return () => Vue.h('a', {
      class: 'title-link',
      href:  props.entry.siteUrl,
      title: browser.i18n.getMessage('CARD_SeeOnAnilist', props.entry.title.userPreferred),
      onClick(evt) {
        evt.preventDefault();

        AnilistEntry.goTo(store, props.entry);
      },
    }, props.entry.title.userPreferred);
  },
};