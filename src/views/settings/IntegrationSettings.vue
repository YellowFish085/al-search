<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>{{ i18n('S_Integration') }}</h2>

    <div class="container">
      <div class="col col--justify-start col--items-start">
        <div class="field">
          <input type="checkbox"
                 name="web_enabled"
                 id="settings__integration__web_enabled"
                 v-model="webEnabled">
          <label for="settings__integration__web_enabled">{{ i18n('S_EnableWebIntegration') }}</label>
        </div>

        <div class="subfield" :class="{ hidden: !webEnabled }">
          <div class="field">
            <input type="checkbox"
                  name="overlay_near_title"
                  id="settings__integration__overlay_near_title"
                  v-model="inPage">
            <label for="settings__integration__overlay_near_title">{{ i18n('S_OverlayNearTitle') }}</label>
          </div>

          <div class="settings__integration__overlay_position subfield col col--justify-start col--items-start" :class="{ hidden: inPage}">
            <p class="note">{{ i18n('S_OverlayPositionFixed') }}</p>
            <div class="field">
              <select name="overlay_x"
                      id="settings__integration__overlay_x"
                      v-model="x">
                <option v-for="xValue in xValues" :key="xValue" :value="xValue">{{ i18n(`ENUM_${xValue}`) }}</option>
              </select>
              <label for="settings__integration__overlay_x">{{ i18n('S_OverlayX') }}</label>
            </div>
            <div class="field">
              <select name="overlay_y"
                      id="settings__integration__overlay_y"
                      v-model="y">
                <option v-for="yValue in yValues" :key="yValue" :value="yValue">{{ i18n(`ENUM_${yValue}`) }}</option>
              </select>
              <label for="settings__integration__overlay_y">{{ i18n('S_OverlayY') }}</label>
            </div>
          </div>
        </div>

        <p v-html="i18n('S_EnableWebIntegrationDescription')"></p>

        <div class="field">
          <input type="checkbox"
                 name="menus_enabled"
                 id="settings__integration__menus_enabled"
                 v-model="menusEnabled">
          <label for="settings__integration__menus_enabled">{{ i18n('S_EnableContextualMenus') }}</label>
        </div>
        <p v-html="i18n('S_EnableContextualMenusDescription')"></p>
      </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as Enum from '@/utils/Enum';
import Helpers from '@/utils/Helpers';
import MixinI18n from '@/mixins/I18n';

const browser = require('webextension-polyfill') // eslint-disable-line

@Component
export default class IntegrationSettings extends Mixins(Vue, MixinI18n) {
  /**
   * Settings from store.
   */
  @State settings!: ALSearch.Settings;

  /** X position values */
  xValues = Enum.WebIntegrationX;

  /** Y position values. */
  yValues = Enum.WebIntegrationY;

  get webEnabled(): boolean {
    return this.settings.integration.webEnabled;
  }

  set webEnabled(value: boolean) {
    const s = Helpers.deepClone(this.settings);

    s.integration.webEnabled = value;

    this.$store.dispatch('updateSettings', s);
  }

  get inPage(): boolean {
    return this.settings.integration.overlay.inPage;
  }

  set inPage(value: boolean) {
    const s = Helpers.deepClone(this.settings);

    s.integration.overlay.inPage = value;

    this.$store.dispatch('updateSettings', s);
  }

  get x(): string {
    return this.settings.integration.overlay.x;
  }

  set x(value: string) {
    const s = Helpers.deepClone(this.settings);

    s.integration.overlay.x = value;

    this.$store.dispatch('updateSettings', s);
  }

  get y(): string {
    return this.settings.integration.overlay.y;
  }

  set y(value: string) {
    const s = Helpers.deepClone(this.settings);

    s.integration.overlay.y = value;

    this.$store.dispatch('updateSettings', s);
  }

  get menusEnabled(): boolean {
    return this.settings.integration.menusEnabled;
  }

  set menusEnabled(value: boolean) {
    const s = Helpers.deepClone(this.settings);

    s.integration.menusEnabled = value;

    this.$store.dispatch('updateSettings', s);

    // Send message to background script to update menus visibility.
    browser.runtime.sendMessage({ code: 'MENUS_TOGGLE', value });
  }
}
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.field {
  margin-bottom: 0.25rem;
}

input {
  cursor: pointer;
}

label {
  color: rgb(var(--color-text));
  margin-left: 0.5rem;
  font-size: 1.4rem;
}

.subfield {
  margin-left: 2rem;

  label {
    font-size: 1.2rem;
  }
}

.settings__integration__overlay_position {
  p {
    margin: 0.5rem 0;
  }

  .field {
    width: 100%;

    select {
      width: 30%;
    }

    label {
      font-style: italic;
    }
  }
}

</style>
