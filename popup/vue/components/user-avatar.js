const UserAvatar = {
  props: {
    'size': ''
  },

  setup(props) {
    return () => Vue.h('a', {
      class:  [`user-avatar ${props.size}`, { 'small': store.search.q }],
      href:   store.user.siteUrl,
      target: '_blank',
      title:  browser.i18n.getMessage('USER_AVATAR_SeeMyProfile'),
    }, Vue.h('img', { src: store.user.avatar.medium }));
  },
};