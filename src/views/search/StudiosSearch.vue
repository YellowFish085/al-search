<template>
  <!-- eslint-disable max-len -->
  <div class="search-results">
    <div class="results-wrapper">
      <transition appear name="fade">
        <!-- Placeholder -->
        <div v-if="!results || results.loading" :key="'loading'" class="results-placeholder" :class="[ settings.search.layout ]">
          <h2>...</h2>
          <div class="grid grid--media w-full">
            <CardMedia v-for="i in [0,1,2]" :key="i" />
          </div>
        </div>
        <!-- Results list -->
        <div v-else :key="'results'">
          <div v-for="studio in list" :key="studio.id">
            <p>
              <a :href="studio.siteUrl"
                :title="i18n('S_SeeOnAnilist', studio.name)"
                :data-url="studio.siteUrl"
                :data-label="studio.name"
                class="studio-link"
                @click="handleClick">
                {{ studio.name }}
                <font-awesome-icon :icon="['fas', 'angle-double-right']" size="sm" />
              </a>
            </p>
            <div class="grid grid--media w-full" :class="[ settings.search.layout ]">
              <CardMedia v-for="media in studio.media.edges" :key="media.node.id" :data="media.node" />
              <div v-if="studio.media.edges.length <= 0">
                <p>{{ i18n('S_NoMediaForStudio') }}</p>
              </div>
            </div>
          </div>
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
import { State } from 'vuex-class';
import CardMedia from '@/components/search/cards/Media.vue';
import * as Enum from '@/utils/Enum';
import MixinI18n from '@/mixins/I18n';
import MixinSaveActivity from '@/mixins/Activity';

@Component({
  components: {
    CardMedia,
  },
})
export default class StudiosSearch extends Mixins(Vue, MixinI18n, MixinSaveActivity) {
  @State('settings') settings!: ALSearch.Settings;

  @Prop() results!: ALSearch.Store.SearchResults | null;

  /**
   * Get list to display.
   */
  get list() {
    return this.results!.results;
  }

  handleClick(e: Event): void {
    e.preventDefault();

    if (this.settings.activity.visitedPages) {
      const activity: ALSearch.Activity.Activity = {
        type: Enum.ActivityType.VISITED_PAGE,
        label: (e.currentTarget as Element).getAttribute('data-label')!,
        value: (e.currentTarget as Element).getAttribute('data-url')!,
        params: {
          type: Enum.SearchType.STUDIOS,
        },
      };

      this.saveActivity(activity);
    }

    window.open((e.currentTarget as Element).getAttribute('data-url')!);
  }
}
</script>

<style lang="scss" scoped>
.studio-link {
  color: rgb(var(--color-gray-800));
  font-size: 1.4rem;
  text-decoration: none;
  transition: 0.15s color;

  &:hover {
    color: rgb(var(--color-blue));
  }

  svg {
    margin-left: 0.5em;
  }
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
</style>
