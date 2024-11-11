const SettingsAbout = {
  setup() {
    return () => [
      Vue.h('h2', browser.i18n.getMessage('SETTINGS_ABOUT_Title')),

      Vue.h('div', { class: 'card', id: 'page-settings__about' }, [
        Vue.h('h3', browser.i18n.getMessage('SETTINGS_ABOUT_Legal')),
        Vue.h('p', { innerHTML: browser.i18n.getMessage('SETTINGS_ABOUT_LegalDescription') }),

        Vue.h('h3', browser.i18n.getMessage('SETTINGS_ABOUT_Links')),
        Vue.h('div', { id: 'page-settings__about__links' }, [
          Vue.h('a', {
            href:   'https://anilist.co',
            id:     'page-settings__about__links__anilist',
            target: '_blank',
            title:  browser.i18n.getMessage('SETTINGS_ABOUT_VisitWebsite', 'AniList'),
          }),

          Vue.h('a', {
            href:   'https://yellowfish085.github.io/al-search/',
            id:     'page-settings__about__links__al-search',
            target: '_blank',
            title:   browser.i18n.getMessage('SETTINGS_ABOUT_VisitWebsite', 'AL Search'),
          }),

          Vue.h('a', {
            href:   'https://github.com/YellowFish085/al-search',
            id:     'page-settings__about__links__github',
            target: '_blank',
            title:   browser.i18n.getMessage('SETTINGS_ABOUT_VisitRepository'),
          }, Vue.h('span', { class: 'fab fa-github' })),
        ]),

        Vue.h('h3', browser.i18n.getMessage('SETTINGS_ABOUT_BuildInformation')),
        Vue.h('h4', browser.i18n.getMessage('SETTINGS_ABOUT_CurrentVersion')),
        Vue.h('p', browser.runtime.getManifest().version),
      ]),
    ];
  },
};