<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>{{ i18n('S_Search') }}</h2>

    <div class="container">
      <div class="col col--justify-start col--items-start">
        <div class="w-full row row--justify-between row--items-start">
          <div class="col col--justify-start col--items-start">
            <div class="field">
              <input type="checkbox"
                     name="onListFirst"
                     id="settings__activity__onListFirst"
                     v-model="onListFirst">
              <label for="settings__activity__onListFirst">{{ i18n('S_ResultsOnListFirst') }}</label>
            </div>
            <p>{{ i18n('S_ResultsOnListFirstDescription') }}</p>
          </div>
        </div>
      </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Helpers from '@/utils/Helpers';
import MixinI18n from '@/mixins/I18n';

@Component
export default class SearchSettings extends Mixins(Vue, MixinI18n) {
  /**
   * Settings from store.
   */
  @State settings!: ALSearch.Settings;

  get onListFirst(): boolean {
    return this.settings.search.onListFirst;
  }

  set onListFirst(value: boolean) {
    const s = Helpers.deepClone(this.settings);

    s.search.onListFirst = value;

    this.$store.dispatch('updateSettings', s);
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
  color: rgb(var(--color-text));
  margin-left: 0.5rem;
  font-size: 1.4rem;
}
</style>
