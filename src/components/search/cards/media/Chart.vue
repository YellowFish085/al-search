<template>
  <!-- eslint-disable max-len -->
  <div v-if="data" class="card card--media" :style="mediaColors">
    <!-- Left -->
    <div class="cover">
      <!-- List status -->
      <div v-if="data.mediaListEntry && data.mediaListEntry.status"
          class="list-status"
          :class="[ data.mediaListEntry.status ]"
          :title="data.mediaListEntry.status.toLowerCase()"></div>
      <!-- Cover -->
      <a :href="data.siteUrl"
         :title="i18n('S_SeeOnAnilist', data.title.userPreferred)"
         class="image-link"
         target="_blank"
         @click="handleClick">
        <img :src="data.coverImage.large">
      </a>
      <!-- Cover overlay -->
      <div class="overlay">
        <a :href="data.siteUrl"
            :title="i18n('S_SeeOnAnilist', data.title.userPreferred)"
            class="title"
            target="_blank"
            @click="handleClick">{{ data.title.userPreferred }}</a>
        <div v-if="studio" class="studio">
          <a :href="studio.siteUrl"
              :title="i18n('S_SeeOnAnilist', studio.name)"
              target="_blank"
              @click="handleStudioClick">{{ studio.name }}</a>
        </div>
      </div>
    </div>
    <!-- Right -->
    <div class="data">
      <div class="body">
        <div class="scroll-wrap">
          <div class="header">
            <!-- Airing + countdown -->
            <div>
              <div v-if="isAiring" class="date airing">
                <div class="episode">{{ nextEpisodeIn }}</div>
                <div class="countdown">{{ countdown }}</div>
              </div>
              <div v-else-if="isPublishing" class="date small">
                  {{ ongoingSince }}
              </div>
              <div v-else class="date">
                {{ datesOrStatus }}
              </div>
              <!-- Typings -->
              <div class="typings">
                <span>{{ this.i18n(`ENUM_${data.format}`) }}</span>
                <template v-if="duration">
                  <span class="separator">•</span>
                  <span>{{ duration }}</span>
                </template>
              </div>
            </div>
            <div>
              <!-- Score -->
              <div class="score">
                <template v-if="data.averageScore">
                  <font-awesome-icon v-if="data.averageScore > 74" :icon="['far', 'smile']" size="sm" />
                  <font-awesome-icon v-else-if="data.averageScore > 59" :icon="['far', 'meh']" size="sm" />
                  <font-awesome-icon v-else :icon="['far', 'frown']" size="sm" />
                  <span class="percentage">{{ data.averageScore }}%</span>
                </template>
              </div>
            </div>
          </div>
          <!-- Description -->
          <div class="description" v-html="data.description"></div>
        </div>
      </div>
      <div class="footer">
        <div class="genres">
          <a v-for="genre in data.genres"
             :key="genre"
             :href="genreUrl(genre)"
             target="_blank"
             class="genre">{{ genre }}</a>
        </div>
      </div>
    </div>
  </div>
  <!-- Placeholder -->
  <div v-else class="card card--placeholder card--media">
    <div class="cover"></div>
    <div class="description">
      <div></div>
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
  backface-visibility: hidden;
  background: rgb(var(--color-background-100));
  border-radius: 4px;
  box-shadow: 0 14px 30px rgba(var(--color-shadow-blue), 0.15),
              0 4px 4px rgba(var(--color-shadow-blue), 0.05);
  display: inline-grid;
  grid-template-columns: 185px auto;
  height: 265px;
  overflow: hidden;
  position: relative;
  text-align: left;
  width: 100%;

  &:hover {
    .description {
      color: rgb(var(--color-gray-800));
    }
  }

  &--placeholder {
    .cover {
      background: rgba(var(--color-background-300), 0.8);
      box-shadow: none;
      opacity: 1;
      overflow: hidden;
    }

    .cover {
      &:before {
        animation: loading-pulse-data 2s linear infinite;
        background: linear-gradient(
          90deg,
          rgba(var(--color-gray-300), 0) 0,
          rgba(var(--color-blue-700), 0.06) 40%,
          rgba(var(--color-blue-700), 0.06) 60%,
          rgba(var(--color-gray-300), 0)
        );
        content: "";
        display: block;
        height: 100%;
        transform: translateX(0);
        width: 200%;
      }
    }

    .description {
      > div {
        background: rgba(var(--color-background-300),.8);
        border-radius: 4px;
        box-shadow: none;
        height: 12px;
        margin-bottom: 10px;
        margin-left: 14px;
        opacity: 1;
        overflow: hidden;
        width: 60%;

        &:first-of-type {
          height: 22px;
          margin-bottom: 18px;
          margin-top: 14px;
          width: 80%;
        }

        &::before {
          animation: loading-pulse-data 2s linear infinite;
          background: linear-gradient(
            90deg,
            rgba(var(--color-gray-300), 0) 0,
            rgba(var(--color-blue-700), 0.06) 40%,
            rgba(var(--color-blue-700), 0.06) 60%,
            rgba(var(--color-gray-300), 0)
          );
          content: "";
          display: block;
          height: 100%;
          transform: translateX(0);
          width: 200%;
        }
      }
    }
  }
}

.cover {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  z-index: 10;
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
  z-index: 9999;

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

.image-link {
  display: block;
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
}

img {
  height: 100%;
  left: 0;
  object-fit: cover;
  position: relative;
  top: 0;
  vertical-align: top;
  width: 100%;
}

.overlay {
  background: rgba(var(--color-overlay), 0.9);
  color: rgb(var(--color-white));
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;
  padding: 12px;
  position: relative;
  width: 100%;

  a:hover {
    color: var(--media-overlay-text);
  }
}

.title {
  color: rgb(var(--color-white));
  transition: color 0.3s ease;
}

.studio {
  color: var(--media-overlay-text);
  font-size: 1.2rem;
  margin-top: 8px;
}

.data {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 44px;
  min-height: 0;
  min-width: 0;
}

.body {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  padding-left: 17px;
  position: relative;
}

.scroll-wrap {
  max-height: 100%;
  overflow: auto;
}

.header {
  display: grid;
  grid-template-columns: auto 60px;
  margin-bottom: 6px;
  padding-right: 17px;
  padding-top: 17px;

  > div {
    min-width: 0;
  }
}

.date {
  color: rgb(var(--color-gray-800));
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.02em;

  &.airing {
    line-height: 1;
  }

  &.small {
    font-size: 1.3rem;
    margin-bottom: -3px;
  }
}

.episode {
  color: rgb(var(--color-gray-700));
  font-size: 1.2rem;
}

.countdown {
  font-size: 1.6rem;
  margin-bottom: -1px;
  padding-top: 8px;
}

.typings {
  color: rgb(var(--color-gray-700));
  display: inline-block;
  font-size: 1.1rem;
  overflow: hidden;
  padding-top: 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.separator {
  margin: 0 2px;
}

.score {
  text-align: right;

  svg {
    font-size: 1.8rem;
    width: 18px;
    vertical-align: middle;

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
  color: rgb(var(--color-gray-700));
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 600;
  padding-left: 3px;
}

.description {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  color: rgb(var(--color-gray-600));
  display: -webkit-box;
  font-size: 1.1rem;
  line-height: 1.6;
  overflow: hidden;
  padding-right: 17px;
  transition: color .2s;
}

.footer {
  align-items: center;
  background: rgb(var(--color-background-200));
  display: grid;
  grid-template-columns: auto 24px;
  padding-right: 14px;
  padding: 0 17px;
}

.genres {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 20px;
  overflow: hidden;
}

.genre {
  background: var(--media-background);
  border-radius: 10px;
  color: var(--media-background-text) !important;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  height: 20px;
  line-height: 2rem;
  margin-right: 11px;
  padding: 0 12px;
  text-transform: lowercase;
}
</style>
