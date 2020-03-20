<template>
  <!-- eslint-disable max-len -->
  <div id="settings__integration">
    <h2>Integration</h2>

    <div class="container">
      <div class="col col--justify-start col--items-start">
        <div class="field">
          <input type="checkbox"
                name="enabled"
                id="settings__integration__enabled"
                v-model="enabled">
          <label for="settings__integration__enabled">Enable web integration</label>
        </div>
        <div class="field">
          <input type="checkbox"
                name="toAnilist"
                id="settings__integration__toAnilist"
                v-model="toAnilist"
                :disabled="!enabled">
          <label for="settings__integration__toAnilist" :class="[enabled ? '' : 'disabled']">Open <b>AniList</b> search results page</label>
        </div>
        <p class="note"><b>AniSearch</b> comes with a web integration feature that adds buttons and links to some website related to anime and manga culture (e.g. Crunchyroll).</p>
        <p class="note">For instance, you will see a button near an anime title on Crunchyroll that will allow you to do a quick search on the anime title with <b>AniSearch</b> (or directly to <b>AniList</b> if you selected the <strong>Open AniList search results page</strong> option).</p>
      </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Settings } from '@/store';
import { State } from 'vuex-class';

@Component
export default class IntegrationSettings extends Vue {
  /**
   * Settings from store.
   */
  @State settings!: Settings;

  get enabled(): boolean {
    return this.settings.integration.enabled;
  }

  set enabled(value: boolean) {
    const s = JSON.parse(JSON.stringify(this.settings));

    s.integration.enabled = value;

    this.$store.dispatch('updateSettings', s);
  }

  get toAnilist(): boolean {
    return this.settings.integration.toAnilist;
  }

  set toAnilist(value: boolean) {
    const s = JSON.parse(JSON.stringify(this.settings));

    s.integration.toAnilist = value;

    this.$store.dispatch('updateSettings', s);
  }
}
</script>

<style lang="scss" scoped>
#settings__integration {
  .field {
    margin-bottom: 0.25rem;

    input {
      cursor: pointer;
    }

    label {
      margin-left: 0.5rem;
      font-size: 0.9rem;

      &.disabled {
        opacity: 0.6;
      }
    }
  }
}
</style>
