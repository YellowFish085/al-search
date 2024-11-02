const ActivityFeedEntry = {
  props: ['activity'],

  setup(props) {
    return () => Vue.h('div',
      {
        class: 'activity-feed__entry',
        onClick(evt) {
          evt.preventDefault();

          switch (props.activity.type) {
            case Enum.ActivityType.SEARCH:
              store.search.season = props.activity.params.season,
              store.search.type   = props.activity.params.type,
              store.search.q      = props.activity.value,
              store.search.year   = props.activity.params.year,

              Search.search(0);
              break;

              case Enum.ActivityType.VISITED_PAGE:
                if (store.settings.activity.visitedPages) {
                  browser.runtime.sendMessage({ code: 'STORE_ACTIVITY', data: deepClone(props.activity) })
                    .then((response) => {
                      if (!response.error) {
                        document.dispatchEvent(new CustomEvent('page-visited'));
                      }
                      else {
                        Notifications.create('activities', browser.i18n.getMessage('Error', response.error));
                      }

                      window.open(props.activity.params.url);
                    });
                }
                else {
                  window.open(props.activity.params.url);
                }
                break;
            }
        },
      },
      [
        // Icon.
        Vue.h('span', { class: ['fas', {
          'fa-search':            props.activity.type === Enum.ActivityType.SEARCH,
          'fa-external-link-alt': props.activity.type === Enum.ActivityType.VISITED_PAGE,
        }]}),

        // Label.
        Vue.h('span', props.activity.label),

        // Params.
        Vue.h('span', [
          browser.i18n.getMessage(`ENUM_TYPE_${props.activity.params.type}`),
          props.activity.params.year,
          browser.i18n.getMessage(`ENUM_SEASON_${props.activity.params.season}`),
        ].filter(i => i).join(' / ')),
      ]
    );
  },
};