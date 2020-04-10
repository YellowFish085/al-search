<template>
  <section class="search-results-wrapper vw" :class="{ loading: !results || results.loading }">
    <div class="wrapper">
      <h1>Search results</h1>

      <!-- Anime & Manga search results -->
      <MediaSearch v-if="[types.ANIME, types.MANGA].includes(results.type)" :results="results" />
      <!-- Studios search results -->
      <StudiosSearch v-else-if="[types.STUDIOS].includes(results.type)" :results="results" />
      <!-- Characters search results -->
      <CharactersSearch v-else-if="[types.CHARACTERS].includes(results.type)" :results="results" />
      <!-- Staff search results -->
      <StaffSearch v-else-if="[types.STAFF].includes(results.type)" :results="results" />


    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as Enum from '@/utils/Enum';
import CharactersSearch from '@/views/search/CharactersSearch.vue';
import MediaSearch from '@/views/search/MediaSearch.vue';
import StaffSearch from '@/views/search/StaffSearch.vue';
import StudiosSearch from '@/views/search/StudiosSearch.vue';

@Component({
  components: {
    CharactersSearch,
    MediaSearch,
    StaffSearch,
    StudiosSearch,
  },
})
export default class Search extends Vue {
  @State('searchResults') results!: AniSearch.Store.SearchResults | null;

  /** Search types. */
  types = Enum.SearchType;
}
</script>

<style lang="scss" scoped>
.search-results-wrapper {
  &.loading {
    height: 100%;
    overflow: hidden;
  }
}
</style>
