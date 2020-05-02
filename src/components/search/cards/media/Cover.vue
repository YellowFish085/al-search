<template>
  <!-- eslint-disable max-len -->
  <a v-if="data"
    :href="data.siteUrl"
    :title="i18n('S_SeeOnAnilist', data.title.userPreferred)"
    class="card card--media"
    :style="mediaColors"
    @click="handleClick">
    <div class="cover">
      <img :src="data.coverImage.large">
    </div>
    <div class="name w-full">
      <div v-if="data.mediaListEntry && data.mediaListEntry.status"
          class="list-status"
          :class="[ data.mediaListEntry.status ]"
          :title="data.mediaListEntry.status.toLowerCase()"></div>
      {{ data.title.userPreferred }}
    </div>
  </a>
  <!-- Placeholder -->
  <div v-else class="card card--placeholder card--media">
    <div class="cover">
    </div>
    <div class="name"></div>
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
  display: grid;
  grid-template-rows: min-content auto;
  position: relative;
  text-decoration: none;
  width: 100%;

  &:hover {
    .name {
      color: var(--media-overlay-text);
    }
  }

  &--placeholder {
    .cover,
    .name {
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

    .name {
      border-radius: 4px;
      height: 17px;
      margin-top: 12px;
      width: 80%;
    }
  }
}

.cover {
  background: rgba(var(--color-background-300), 0.8);
  border-radius: 4px;
  box-shadow: 0 14px 30px rgba(var(--color-shadow-blue), 0.15),
              0 4px 4px rgba(var(--color-shadow-blue), 0.05);
  cursor: pointer;
  display: inline-block;
  height: 185px;
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 5;
}

img {
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
}

.name {
  color: rgb(var(--color-gray-700));
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 21px;
  margin-top: 10px;
  overflow: hidden;
  transition: color .2s ease;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.list-status {
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin-right: 5px;
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
</style>
