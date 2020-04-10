<template>
  <!-- eslint-disable max-len -->
  <div id="studios_search_results" class="search-results">
    <div class="search-wrapper">
      <transition appear name="fade">
        <!-- Placeholder -->
        <div v-if="!results || results.loading" :key="'loading'" class="results-placeholder">
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
                :title="`See ${studio.name} on AniList`"
                :data-url="studio.siteUrl"
                :data-label="studio.name"
                class="studio-link"
                @click="handleClick">
                {{ studio.name }}
                <font-awesome-icon :icon="['fas', 'angle-double-right']" size="sm" />
              </a>
            </p>
            <div class="grid grid--media w-full">
              <CardMedia v-for="media in studio.media.edges" :key="media.node.id" :data="media.node" />
              <div v-if="studio.media.edges.length <= 0">
                <p>No media to preview for this studio.</p>
              </div>
            </div>
          </div>
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
import { SaveActivity } from '@/mixins/Activity';
import { State } from 'vuex-class';
import CardMedia from '@/components/search/cards/Media.vue';
import * as Enum from '@/utils/Enum';

@Component({
  components: {
    CardMedia,
  },
})
export default class StudiosSearch extends Mixins(Vue, SaveActivity) {
  @State('settings') settings!: AniSearch.Settings;

  @Prop() results!: AniSearch.Store.SearchResults | null;

  /**
   * Get list to display.
   */
  get list() {
    return this.results!.results;
  }

  handleClick(e: Event): void {
    e.preventDefault();

    if (this.settings.activity.visitedPages) {
      const activity: AniSearch.Activity.Activity = {
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
#studios_search_results {
  .studio-link {
    color: rgb(var(--color-text));
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
}
</style>
