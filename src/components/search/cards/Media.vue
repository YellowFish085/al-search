<template>
  <!-- eslint-disable max-len -->
  <div v-if="data" class="card card--media" :style="{ '--media-color': data.coverImage.color }">
    <a :href="data.siteUrl"
       :title="`See ${data.title.userPreferred} on AniList`"
       class="cover col col--justify-end"
       :style="{ 'background-image': `url(${data.coverImage.large})` }"
       @click="handleClick">
      <div v-if="data.mediaListEntry && data.mediaListEntry.status"
           class="list-status"
           :class="[ data.mediaListEntry.status ]"
           :title="data.mediaListEntry.status.toLowerCase()"></div>
      <div class="overlay w-full col col--justify-end">
        <a :href="data.siteUrl"
           class="title w-full"
           @click="handleClick">{{ data.title.userPreferred }}</a>
        <div v-if="studio" class="subtitle w-full">
          <a :href="studio.siteUrl"
             :title="`See ${studio.name} on AniList`">{{ studio.name }}</a>
        </div>
      </div>
    </a>
    <div class="data">
      <div v-if="countdown" class="airing-countdown">
        <span>{{ countdown }}</span>
      </div>
      <div class="extra">
        <div class="format"><span>{{ data.format }}</span></div>
        <div class="score"><span>{{ data.averageScore }}%</span></div>
      </div>
      <div class="description" v-html="data.description"></div>
      <div class="genres w-full">
        <span v-for="genre in data.genres" :key="genre">{{ genre }} , </span>
      </div>
    </div>
  </div>
  <!-- Placeholder -->
  <div v-else class="card card--placeholder card--media">
    <div class="cover"></div>
    <div class="data">
      <div class="block block--big"></div>
      <div class="block block--medium"></div>
      <div class="block block--medium"></div>
      <div class="block block--small"></div>
      <div class="block block--small"></div>
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
import * as Enum from '@/utils/Enum';
import MixinSaveActivity from '@/mixins/Activity';

@Component
export default class Media extends Mixins(Vue, MixinSaveActivity) {
  @State('settings') settings!: AniListSearch.Settings;

  @Prop() readonly data?: AniListSearch.AniList.Media;

  /** Search types. */
  types = Enum.SearchType;

  /**
   * Return countdown content.
   */
  get countdown(): string {
    let str = '';

    if (this.data!.nextAiringEpisode) str = `Ep ${this.data!.nextAiringEpisode.episode} - ${this.timeUntilAiring()}`;
    else if (this.data!.type === this.types.MANGA) str = this.startDate();
    else if (this.data!.season) str = `${this.data!.season.toLowerCase()} ${this.data!.startDate.year}`;

    return str;
  }

  /**
   * Return media studio if available.
   */
  get studio() {
    if (this.data!.studios && this.data!.studios.edges[0]) return this.data!.studios.edges[0].node;
    return null;
  }

  /**
   * Return formatted next airing date.
   */
  timeUntilAiring(): string {
    const seconds = this.data!.nextAiringEpisode!.timeUntilAiring;

    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let str = '';
    if (minutes) str = ` ${minutes}m`;
    if (hours) str = ` ${hours}h${str}`;
    if (days) str = `${days}d${str}`;

    return str.trim();
  }

  /**
   * Return formatted start date.
   */
  startDate(): string {
    if (this.data!.startDate.year && this.data!.startDate.month && this.data!.startDate.day) {
      const date = new Date(
        this.data!.startDate.year,
        this.data!.startDate.month,
        this.data!.startDate.day,
      );

      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    return '';
  }

  handleClick(e: Event): void {
    e.stopPropagation();
    e.preventDefault();

    if (this.settings.activity.visitedPages) {
      const activity: AniListSearch.Activity.Activity = {
        type: Enum.ActivityType.VISITED_PAGE,
        label: this.data!.title.userPreferred,
        value: this.data!.siteUrl,
        params: {
          type: this.data!.type as Enum.SearchType,
        },
      };

      this.saveActivity(activity);
    }

    window.open(this.data!.siteUrl);
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: inline-grid;
  grid-template-columns: 185px auto;
  height: 265px;
  min-width: 370px;
}

.cover {
  background-color: var(--media-color);
}

.list-status {
  border-radius: 50%;
  box-shadow: 0 1px 10px rgba(var(--color-shadow), 0.8);
  cursor: help;
  height: 10px;
  left: 12px;
  position: absolute;
  top: 12px;
  width: 10px;

  &.COMPLETED {
    background-color: rgb(var(--color-green));
  }

  &.CURRENT,
  &.REPEATING {
    background-color: rgb(var(--color-blue));
  }

  &.DROPPED {
    background-color: rgb(var(--color-red));
  }

  &.PAUSED {
    background-color: rgb(var(--color-peach));
  }

  &.PLANNING {
    background-color: rgb(var(--color-orange));
  }
}

.data {
  position: relative;
}

.airing-countdown {
  background-color: rgb(var(--color-foreground-blue-dark));
  color: rgb(var(--color-blue));
  font-size: 1.2rem;
  font-weight: 500;
  padding: 10px;
  text-align: center;
  text-transform: capitalize;
}

.extra {
  background-color: rgb(var(--color-foreground-blue));
  color: rgb(var(--color-text-light));
  display: grid;
  font-size: 1.1rem;
  grid-template-columns: 50% 50%;
}

.format,
.score {
  display: inline-block;
  padding: 8px;
  text-align: center;
}

.description {
  color: rgb(var(--color-text-light));
  font-size: 1.1rem;
  height: 160px;
  line-height: 15px;
  overflow: hidden;
  padding: 12px;

  &:hover {
    overflow-y: scroll;
  }
}

.genres {
  background-color: rgb(var(--color-foreground-blue));
  bottom: 0;
  color: rgb(var(--color-text-lighter));
  font-size: 1.1rem;
  left: 0;
  line-height: 13px;
  padding: 8px 10px;
  position: absolute;
  text-align: center;
}
</style>
