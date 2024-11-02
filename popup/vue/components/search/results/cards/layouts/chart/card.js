const CardChart = {
  props: ['entry'],

  setup(props) {
    return () => Vue.h('div',
      {
        class: 'card-chart',
        id: `card-${props.entry.id}`,
        style: Color.mediaColors(props.entry.coverImage.color, store.settings.theme === Enum.Theme.DARK),
      },
      [
        // Cover.
        Vue.h('div', { class: 'cover' }, [
          // Image.
          Vue.h(CardPartImageLink, { entry: props.entry }),

          // Overlay.
          Vue.h('div', { class: 'overlay' }, [
            // Title.
            Vue.h(CardPartColoredTitle, { entry: props.entry }),

            // Studio.
            !AnilistEntry.studio(props.entry) ? null :
              Vue.h('div', { class: 'studio' },
                Vue.h('a', {
                  href:   AnilistEntry.studio(props.entry).siteUrl,
                  target: '_blank',
                }, AnilistEntry.studio(props.entry).name),
              ),
          ])
        ]),

        Vue.h('div', { class: 'card-content' }, [
          // Body.
          Vue.h('div', { class: 'card-content-body' }, [
            Vue.h('div', {
              class: 'scroll-wrap',
              onMouseover() { document.querySelector(`#card-${props.entry.id} .scroll-wrap`).classList.add('active'); },
              onMouseout() { document.querySelector(`#card-${props.entry.id} .scroll-wrap`).classList.remove('active'); },
            },
              [
                Vue.h('div', { class: 'card-content-header' }, [
                  Vue.h('div', [
                    // Dates.
                    Vue.h('div', { class: 'date' },
                      props.entry.nextAiringEpisode
                        ? [
                          Vue.h('div', { class: 'episode' }, Vue.h('div',
                            props.entry.episodes
                              ? browser.i18n.getMessage('CARD_NextAiringEpisodeOfEpisodesIn', [props.entry.nextAiringEpisode.episode.toString(), props.entry.episodes.toString()])
                              : browser.i18n.getMessage('CARD_NextAiringEpisodeIn', props.entry.nextAiringEpisode.episode.toString())
                          )),
                          Vue.h('div', { class: 'countdown' }, AnilistEntry.countdown(props.entry)),
                        ]
                        : AnilistEntry.dates(props.entry),
                    ),

                    // Typings.
                    Vue.h('div', { class: 'typings' }, [
                      Vue.h('span', browser.i18n.getMessage(`ENUM_FORMAT_${props.entry.format}`)),

                      !AnilistEntry.duration(props.entry) ? null :
                        [
                          Vue.h('span', ' '),
                          Vue.h('span', '•'),
                          Vue.h('span', ' '),
                          Vue.h('span', AnilistEntry.duration(props.entry)),
                        ],
                    ]),
                  ]),

                  Vue.h('div',
                    props.entry.averageScore ? Vue.h(CardPartScore, { entry: props.entry }) : null,
                  ),
                ]),

                Vue.h('div', { class: 'description' }, props.entry.description.replace(/(<([^>]+)>)/gi, "")),
              ]
            ),
          ]),

          // Footer.
          Vue.h('div', { class: 'card-content-footer' }, [
            Vue.h(CardPartGenres, { entry: props.entry }),

            // On list badge.
            Vue.h(CardPartOnListStatus, { entry: props.entry }),
          ]),
        ]),
      ]
    );
  },
};