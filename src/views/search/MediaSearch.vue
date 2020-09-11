<template>
  <!-- eslint-disable max-len -->
  <div class="search-results">
    <ListTitle :title="firstListLabel" :displayed="firstListDisplayed" :onClick="togleFirstList" />
    <div class="results-wrapper" :class="{ folded: !firstListDisplayed }">
      <div class="folded-overlay"></div>
      <transition appear name="fade">
        <!-- Placeholder -->
        <div v-if="!results || results.loading" :key="'loading'" class="grid grid--media results-placeholder w-full" :class="[ settings.search.layout ]">
          <CardMedia v-for="i in [0,1,2,3,4,5]" :key="i" />
        </div>
        <!-- Results list -->
        <div v-else :key="'results'" class="grid grid--media w-full" :class="[ settings.search.layout ]">
          <CardMedia v-for="item in firstList" :key="item.id" :data="item" />
          <p v-if="firstList.length === 0">{{ i18n('S_ResultsEmpty') }}</p>
        </div>
      </transition>
    </div>
    <div v-if="results && !results.loading && secondList !== null" class="second-list">
      <ListTitle :title="secondListLabel" :displayed="secondListDisplayed" :onClick="togleSecondList" />
      <div class="results-wrapper" :class="{ folded: !secondListDisplayed }">
        <div class="folded-overlay"></div>
        <transition appear name="fade">
          <!-- Results list -->
          <div class="grid grid--media w-full" :class="[ settings.search.layout ]">
            <CardMedia v-for="item in secondList" :key="item.id" :data="item" />
            <p v-if="secondList.length === 0">{{ i18n('S_ResultsEmpty') }}</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import { State } from 'vuex-class';
import CardMedia from '@/components/search/cards/Media.vue';
import ListTitle from '@/components/search/lists/ListTitle.vue';
import MixinI18n from '@/mixins/I18n';

@Component({
  components: {
    CardMedia,
    ListTitle,
  },
})
export default class MediaSearch extends Mixins(Vue, MixinI18n) {
  /**
   * Settings from store.
   */
  @State settings!: ALSearch.Settings;

  /**
   * User from store.
   */
  @State user!: ALSearch.AniList.User | null;

  /**
   * Search from state.
   */

  @Prop() results!: ALSearch.Store.SearchResults | null;

  firstListDisplayed = true;

  secondListDisplayed = true;

  togleFirstList() {
    this.firstListDisplayed = !this.firstListDisplayed;
  }

  togleSecondList() {
    this.secondListDisplayed = !this.secondListDisplayed;
  }

  /**
   * Get list label string.
   */
  get firstListLabel() {
    if (this.user) {
      return this.settings.search.onListFirst ? this.i18n('S_ResultsOnList') : this.i18n('S_ResultsGlobal');
    }

    // If user not logged in, don't display content.
    return '';
  }

  /**
   * Get second list label.
   */
  get secondListLabel() {
    if (this.user) {
      return this.settings.search.onListFirst ? this.i18n('S_ResultsGlobal') : this.i18n('S_ResultsOnList');
    }

    // If user not logged in, don't display content.
    return '';
  }

  /**
   * Get first list to display.
   */
  get firstList() {
    if (!this.user) return this.results!.results;

    return this.settings.search.onListFirst
      ? this.results!.resultsOnList
      : this.results!.results;
  }

  /**
   * Get second list to display.
   *
   * This is available only if the user is logged in.
   */
  get secondList() {
    if (!this.user) return null;

    return this.settings.search.onListFirst
      ? this.results!.results
      : this.results!.resultsOnList;
  }

  /**
   * Force lists to be re-displayed on results changes.
   */
  @Watch('results')
  onResultsChanged(newValue: ALSearch.Store.SearchResults | null) {
    this.firstListDisplayed = true;
    this.secondListDisplayed = true;
  }
}
</script>

<style lang="scss" scoped>
.results-wrapper {
  min-height: 50px;

  &.folded {
    height: 50px;
    overflow: hidden;

    .folded-overlay {
      display: block;
    }
  }
}

.folded-overlay {
  bottom: 0;
  box-shadow: inset 0 -30px 25px 0 rgb(var(--color-background));
  display: none;
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 9999;
}

.grid {
  &.CHART {
    grid-template-columns: repeat(auto-fill, 100%);
  }

  &.COVER {
    column-gap: 5%;
    grid-template-columns: repeat(auto-fill, 30%);
  }

  &.TABLE {
    grid-template-columns: repeat(auto-fill, 100%);
    row-gap: 16px;
  }
}

.second-list {
  margin-top: 25px;
}
</style>
