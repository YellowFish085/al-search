<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>Integration</h2>

    <div class="container">
      <div class="col col--justify-start col--items-start">
        <div class="field">
          <input type="checkbox"
                 name="web_enabled"
                 id="settings__integration__web_enabled"
                 v-model="webEnabled">
          <label for="settings__integration__web_enabled">Enable web integration</label>
        </div>
        <p><b>AniSearch</b> comes with a web integration feature that adds buttons and links to some website related to anime and manga culture (e.g. Crunchyroll).</p>
        <p>For instance, you will see a button near an anime title on Crunchyroll that will allow you to do a quick search on the anime title with <b>AniSearch</b> (or directly to <b>AniList</b> if you selected the <strong>Open AniList search results page</strong> option).</p>
        <div class="field">
          <input type="checkbox"
                 name="menus_enabled"
                 id="settings__integration__menus_enabled"
                 v-model="menusEnabled">
          <label for="settings__integration__menus_enabled">Enable contextual menus</label>
        </div>
        <p><b>AniSearch</b> adds contextual actions to quickly execute a search a selected text on a page.</p>
      </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

const browser = require('webextension-polyfill') // eslint-disable-line

@Component
export default class IntegrationSettings extends Vue {
  /**
   * Settings from store.
   */
  @State settings!: AniSearch.Settings;

  get webEnabled(): boolean {
    return this.settings.integration.webEnabled;
  }

  set webEnabled(value: boolean) {
    const s = JSON.parse(JSON.stringify(this.settings));

    s.integration.webEnabled = value;

    this.$store.dispatch('updateSettings', s);
  }

  get menusEnabled(): boolean {
    return this.settings.integration.menusEnabled;
  }

  set menusEnabled(value: boolean) {
    const s = JSON.parse(JSON.stringify(this.settings));

    s.integration.menusEnabled = value;

    this.$store.dispatch('updateSettings', s);

    // Send message to background script to update menus visibility.
    browser.runtime.sendMessage({ code: 'MENUS_TOGGLE', value });
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 0.25rem;
}

input {
  cursor: pointer;
}

label {
  margin-left: 0.5rem;
  font-size: 1.4rem;

  &.disabled {
    opacity: 0.6;
  }
}

</style>
