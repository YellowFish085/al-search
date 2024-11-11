const CardTable = {
  props: ['entry'],

  setup(props) {
    return () => Vue.h('div',
      {
        class: 'card-table',
        style: Color.mediaColors(props.entry.coverImage.color, store.settings.theme === Enum.Theme.DARK),
      },
      [
        // Cover.
        Vue.h(CardPartImageLink, { entry: props.entry }),

        Vue.h('div', { class: 'card-content' }, [
          Vue.h('div', { class: 'title' }, [
            // Title.
            Vue.h('div', { class: 'title-wrap' },
              Vue.h(CardPartColoredTitle, { entry: props.entry })
            ),

            // Genres.
            Vue.h(CardPartGenres, { entry: props.entry }),
          ]),

          // Score.
          !props.entry.averageScore ? null : [
            Vue.h(CardPartScore, { entry: props.entry }),
            Vue.h('div', '•'),
           ],

          // Format.
          Vue.h('div', browser.i18n.getMessage(`ENUM_FORMAT_${props.entry.format}`)),

          // Duration.
          AnilistEntry.duration(props.entry) ? Vue.h('div', { class: 'length' }, AnilistEntry.duration(props.entry)) : null,

          props.entry.format && AnilistEntry.duration(props.entry) ? Vue.h('div', '•') : null,

          // Dates.
          Vue.h('div', AnilistEntry.dates(props.entry)),

          Vue.h('div', '•'),

          // Status.
          Enum.SearchType.ANIME !== store.search.type ? null :
            props.entry.status === Enum.Status.RELEASING && props.entry.nextAiringEpisode
              ? Vue.h('span', browser.i18n.getMessage('CARD_NextAiringEpisodeIn', props.entry.nextAiringEpisode.episode.toString()) + ' ' + AnilistEntry.countdown(props.entry, true))
              : Vue.h('span', browser.i18n.getMessage(`ENUM_STATUS_${props.entry.status}`)),

          Enum.SearchType.MANGA !== store.search.type ? null :
            props.entry.status === Enum.Status.RELEASING
              ? Vue.h('span', browser.i18n.getMessage('CARD_Publishing'))
              : Vue.h('span', browser.i18n.getMessage(`ENUM_STATUS_${props.entry.status}`)),
        ]),
      ]
    );
  },
};