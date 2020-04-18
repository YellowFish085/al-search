<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>{{ i18n('S_About') }}</h2>

    <div class="container">
      <h3>{{ i18n('S_Legal') }}</h3>
      <p v-html="i18n('S_LegalDescription')"></p>

      <h3>{{ i18n('S_Links') }}</h3>
      <p class="links row row--justify-start row--items-center">
        <a href="https://anilist.co" :title="i18n('S_VisitWebsite', 'AniList')" class="anilist" target="_blank"></a>
        <a href="https://yellowfish085.github.io/al-search/" :title="i18n('S_VisitWebsite', 'AL Search')" class="al-search" target="_blank"></a>
        <a href="https://github.com/YellowFish085/al-search" :title="i18n('S_VisitRepository', 'AL Search')" class="github" target="_blank"><font-awesome-icon :icon="['fab', 'github']" size="3x" /></a>
      </p>

      <h3>{{ i18n('S_BuildInformation') }}</h3>
      <h4>{{ i18n('S_CurrentVersion') }}</h4>
      <p> v{{ browser.runtime.getManifest().version }}</p>

      <h4>{{ i18n('S_Changelog') }}</h4>
      <div class="releases">
        <div v-for="release in releases" :key="release" class="release">
          <p class="version">{{ release.tag_name }}</p>
          <p class="date note">{{ new Date(release.published_at).toUTCString() }}</p>
          <p v-html="release.body" class="body note"></p>
        </div>
      </div>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import MixinI18n from '@/mixins/I18n';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component
export default class About extends Mixins(Vue, MixinI18n) {
  /** Changelog from repository as a JSON. */
  releases: ALSearch.Github.Release[] | null = null;

  get browser() {
    return browser;
  }

  async created() {
    try {
      const response = await fetch('https://api.github.com/repos/YellowFish085/al-search/releases');

      this.releases = (await response.json()) as ALSearch.Github.Release[];
    }
    catch (e) {
      console.error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
.links {
  a {
    background-color: rgb(var(--color-overlay));
    background-position: center;
    background-size: cover;
    border-radius: 3px;
    height: 50px;
    margin-right: 10px;
    width: 50px;

    &.anilist {
      background-image: url('https://anilist.co/img/icons/icon.svg');
    }

    &.al-search {
      background-image: url('../../../public/logo.svg');
    }

    &.github {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: center;

      svg {
        width: 80%;
        height: 80%;
      }
    }
  }
}

.releases {
  max-height: 200px;
  overflow-y: auto;
}

.release {
  margin-top: 15px;

  &:first-child {
    margin-top: 10px;
  }

  p {
    margin: 0;

    &.date {
      margin-bottom: 5px;
    }
  }
}

.note {
  font-size: 1rem;
}
</style>
