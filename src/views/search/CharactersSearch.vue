<template>
  <!-- eslint-disable max-len -->
  <div class="search-results">
    <div class="results-wrapper">
      <transition appear name="fade">
        <!-- Placeholder -->
        <div v-if="!results || results.loading" :key="'loading'" class="grid grid--person results-placeholder w-full">
          <CardCharacter v-for="i in [0,1,2,3,4,5]" :key="i" />
        </div>
        <!-- Results list -->
        <div v-else :key="'results'" class="grid grid--person w-full">
          <CardCharacter v-for="item in list" :key="item.id" :data="item" />
          <p v-if="list.length === 0">{{ i18n('S_ResultsEmpty') }}</p>
        </div>
      </transition>
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
} from 'vue-property-decorator';
import CardCharacter from '@/components/search/cards/Character.vue';
import MixinI18n from '@/mixins/I18n';

@Component({
  components: {
    CardCharacter,
  },
})
export default class CharactersSearch extends Mixins(Vue, MixinI18n) {
  @Prop() results!: ALSearch.Store.SearchResults | null;

  /**
   * Get list to display.
   */
  get list() {
    return this.results!.results;
  }
}
</script>

<style lang="scss" scoped>
.grid {
  column-gap: 5%;
  grid-template-columns: repeat(auto-fill, 30%);
}
</style>
