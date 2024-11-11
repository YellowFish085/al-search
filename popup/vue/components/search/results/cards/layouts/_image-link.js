const CardPartImageLink = {
  props: ['entry'],

  setup(props) {
    return () => Vue.h('a',
      {
        class: 'image-link',
        href:  props.entry.siteUrl,
        title: browser.i18n.getMessage('CARD_SeeOnAnilist', props.entry.title.userPreferred),
        onClick(evt) {
          evt.preventDefault();

          AnilistEntry.goTo(store, props.entry);
        },
      },
      Vue.h('img', {
        src: props.entry.coverImage.large,
        onLoad(evt) { evt.target.classList.add('loaded'); },
      })
    );
  },
};