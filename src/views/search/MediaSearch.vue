<template>
  <!-- eslint-disable max-len -->
  <div class="search-results">
    <h2>{{ listsOrder }}</h2>
    <div class="results-wrapper">
      <transition appear name="fade">
        <!-- Placeholder -->
        <div v-if="!results || results.loading" :key="'loading'" class="grid grid--media results-placeholder w-full">
          <CardMedia v-for="i in [0,1,2]" :key="i" />
        </div>
        <!-- Results list -->
        <div v-else :key="'results'" class="grid grid--media w-full">
          <CardMedia v-for="item in firstList" :key="item.id" :data="item" />
          <CardMedia v-for="item in secondList" :key="item.id" :data="item" />
        </div>
      <transition>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import CardMedia from '@/components/search/cards/Media.vue';

@Component({
  components: {
    CardMedia,
  },
})
export default class MediaSearch extends Vue {
  /**
   * Settings from store.
   */
  @State settings!: AniSearch.Settings;

  /**
   * User from store.
   */
  @State user!: AniSearch.AniList.User | null;

  /**
   * Search from state.
   */

  @Prop() results!: AniSearch.Store.SearchResults | null;

  /**
   * Get list order string.
   */
  get listsOrder() {
    if (this.user) {
      return this.settings.search.onListFirst ? 'Results from your list first' : 'Global results first';
    }

    // If user not logged in, don't display content.
    return '';
  }

  /**
   * Get first list to display.
   */
  get firstList() {
    return this.user && this.settings.search.onListFirst
      ? this.results!.resultsOnList
      : this.results!.results;
  }

  /**
   * Get second list to display.
   */
  get secondList() {
    return this.user && this.settings.search.onListFirst
      ? this.results!.results
      : this.results!.resultsOnList;
  }
}
</script>

<style lang="scss" scoped>

</style>
