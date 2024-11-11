const CardPartGenres = {
  props: ['entry'],

  setup(props) {
    return () => Vue.h('div', { class: 'genres' }, [
      props.entry.genres.map((genre) => Vue.h('a', {
        class: 'genre',
        href:   store.search.type === Enum.SearchType.ANIME
          ? `https://anilist.co/search/anime/${genre}`
          : `https://anilist.co/search/manga/${genre}`,
        target: '_blank',
      }, genre)),
    ]);
  },
};