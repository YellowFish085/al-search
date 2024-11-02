const CardCover = {
  props: ['entry', 'type'],

  setup(props) {
    let color;
    let image;
    let name;
    let siteUrl;

    switch (props.type) {
      case Enum.SearchType.ANIME:
      case Enum.SearchType.MANGA:
        color   = props.entry.coverImage.color;
        image   = props.entry.coverImage.large;
        name    = props.entry.title.userPreferred;
        siteUrl = props.entry.siteUrl;
        break;

      case Enum.SearchType.CHARACTERS:
      case Enum.SearchType.STAFF:
        color   = null;
        image   = props.entry.image.large;
        name    = props.entry.name.full;
        siteUrl = props.entry.siteUrl;
        break;
    }

    return () => Vue.h('a',
      {
        class: 'card-cover',
        href:   siteUrl,
        style:  color
          ? Color.mediaColors(color, store.settings.theme === Enum.Theme.DARK)
          : null,
        title:  browser.i18n.getMessage('CARD_SeeOnAnilist', name),
        onClick(evt) {
          evt.preventDefault();

          AnilistEntry.goTo(store, props.entry);
        },
      },
      [
        // Cover.
        Vue.h('div', { class: 'cover' },
          // Cover image.
          Vue.h('img', {
            src: image,
            onLoad(evt) { evt.target.classList.add('loaded'); }
          })
        ),

        // Title.
        Vue.h('div', { class: 'title' }, [
          // On list badge.
          Vue.h(CardPartOnListStatus, { entry: props.entry }),

          // Title.
          Vue.h('span', name),
        ]),
      ]
    );
  },
};