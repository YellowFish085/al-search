<template>
  <!-- eslint-disable max-len -->
  <div v-if="data" class="card card--media" :style="mediaColors">
    <!-- Cover -->
    <a v-if="data"
      :href="data.siteUrl"
      :title="i18n('S_SeeOnAnilist', data.title.userPreferred)"
      class="cover"
      :style="mediaColors"
      @click="handleClick">
      <img :src="data.coverImage.large">
    </a>
    <!-- Content -->
    <div class="content">
      <!-- Title + genres -->
      <div class="title">
        <div class="title-wrap">
          <a :href="data.siteUrl"
            :title="i18n('S_SeeOnAnilist', data.title.userPreferred)"
            class="title-link"
            target="_blank"
            @click="handleClick">{{ data.title.userPreferred }}</a>
        </div>
        <div class="genres">
          <a v-for="genre in data.genres"
             :key="genre"
             :href="genreUrl(genre)"
             target="_blank"
             class="genre">{{ genre }}</a>
        </div>
      </div>
      <!-- Score -->
      <div v-if="data.averageScore" class="score col col--justify-center col--items-center">
        <font-awesome-icon v-if="data.averageScore > 74" :icon="['far', 'smile']" size="sm" />
        <font-awesome-icon v-else-if="data.averageScore > 59" :icon="['far', 'meh']" size="sm" />
        <font-awesome-icon v-else :icon="['far', 'frown']" size="sm" />
        <div class="percentage">{{ data.averageScore }}%</div>
      </div>
      <div v-else>n/a</div>
      <div>•</div>
      <!-- Format + duration -->
      <div class="format">
        {{ this.i18n(`ENUM_${data.format}`) }}
        <div v-if="duration" class="length">{{ duration }}</div>
      </div>
      <div>•</div>
      <!-- Status -->
      <div class="date">
        <template v-if="!isAiring && !isPublishing">
          {{ datesOrStatus }}
        </template>
        <template v-else-if="isPublishing">
          {{ ongoingSince }}
        </template>
        {{ this.i18n(`ENUM_${data.status}`) }}
        <div v-if="airing" class="airing">{{ nextEpisodeIn }} {{ countdown }}</div>
      </div>
    </div>
  </div>
  <!-- Placeholder -->
  <div v-else class="card card--placeholder card--media">
    <div class="cover"></div>
    <div class="content">
      <div></div>
      <div></div>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import MixinCardMedia from '@/mixins/CardMedia';

@Component
export default class Cover extends Mixins(Vue, MixinCardMedia) {}
</script>

<style lang="scss" scoped>
.card {
  animation: in-data-v-c8e41a04 .3s linear;
  backface-visibility: hidden;
  background: rgb(var(--color-background-100));
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 14px 30px rgba(var(--color-shadow-blue), 0.15),
              0 4px 4px rgba(var(--color-shadow-blue), 0.05);
  display: inline-grid;
  grid-template-columns: 58px auto;
  position: relative;
  text-align: left;
  min-height: 80px;

  &--placeholder {
    .cover,
    .content > div {
      background: rgba(var(--color-background-300), 0.8);
      box-shadow: none;
      opacity: 1;
      overflow: hidden;

      &:before {
        animation: loading-pulse-data 2s linear infinite;
        background: linear-gradient(
          90deg,
          rgba(var(--color-gray-300), 0) 0,
          rgba(var(--color-blue-700), 0.06) 40%,
          rgba(var(--color-blue-700), 0.06) 60%,
          rgba(var(--color-gray-300), 0)
        );
        content: '';
        display: block;
        height: 100%;
        transform: translateX(0);
        width: 200%;
      }
    }

    .content > div {
      border-radius: 4px;
      display: block;
      height: 12px;
      width: 60%;

      &:first-of-type {
        height: 20px;
        margin-bottom: 14px;
        width: 30%;
      }
    }
  }
}

.cover {
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

img {
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  transition: opacity .3s ease-in-out;
  width: 100%;
}

.content {
  min-width: 0;
  padding-right: 8px;
  padding: 4px 12px;

  > div {
    color: rgb(var(--color-gray-800));
    display: inline-block;
    font-size: 1.4rem;

    &:not(.title) {
      color: rgb(var(--color-gray-700));
      font-size: 1.3rem;

      &:not(:last-child) {
        margin-right: 6px;
      }
    }
  }
}

.title {
  margin-bottom: 6px;
  width: 100%;
}

.title-wrap {
  color: rgb(var(--color-gray-900));
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.title-link {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: var(--media-overlay-text) !important;
  }
}

.genres {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 18px;
  overflow: hidden;
  margin-left: -2px;
}

.genre {
  background: var(--media-background);
  border-radius: 10px;
  color: var(--media-background-text) !important;
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 700;
  height: 18px;
  line-height: 2.1rem;
  margin-right: 8px;
  padding: 0 10px;
  text-transform: lowercase;
}

.score {
  svg {
    vertical-align: top;

    &.fa-smile {
      color: rgb(var(--color-green));
    }

    &.fa-meh {
      color: rgb(var(--color-orange));
    }

    &.fa-frown {
      color: rgb(var(--color-red));
    }
  }
}

.percentage {
  display: inline-block;
  padding-left: 4px;
}

.length,
.airing {
  color: rgb(var(--color-gray-700));
  display: inline-block;
  font-size: 1.3rem;
}
</style>
