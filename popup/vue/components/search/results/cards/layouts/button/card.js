const CardButton = {
  props: ['entry'],

  setup(props) {
    return () => Vue.h('a', {
      class: 'card-button',
      href:  props.entry.siteUrl,
      title: browser.i18n.getMessage('CARD_SeeOnAnilist', props.entry.name),
      onClick(evt) {
        evt.preventDefault();

        AnilistEntry.goTo(store, props.entry);
      },
    }, Vue.h('div', { class: 'name' }, props.entry.name));
  },
};