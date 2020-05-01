<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>{{ i18n('S_Activity') }}</h2>

    <div class="container">
      <div class="col col--justify-start col--items-start">
        <div class="w-full row row--justify-between row--items-start">
          <div class="col col--justify-start col--items-start">
            <div class="field">
              <input type="checkbox"
                     name="search"
                     id="settings__activity__search"
                     v-model="search">
              <label for="settings__activity__search">{{ i18n('S_ActivitySaveSearch') }} <font-awesome-icon :icon="['fas', 'search']" size="xs" class="icon blue" /></label>
            </div>
            <div class="field">
              <input type="checkbox"
                     name="visitedPages"
                     id="settings__activity__visitedPages"
                     v-model="visitedPages">
              <label for="settings__activity__visitedPages">{{ i18n('S_ActivitySaveVisitedPage') }} <font-awesome-icon :icon="['fas', 'external-link-alt']" size="xs" class="icon blue" /></label>
            </div>
          </div>
          <ButtonClear />
        </div>
        <p v-html="i18n('S_ActivityDescription')"></p>
      </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ButtonClear from '@/components/activity/ButtonClear.vue';
import Helpers from '@/utils/Helpers';
import MixinI18n from '@/mixins/I18n';

@Component({
  components: {
    ButtonClear,
  },
})
export default class ActivitySettings extends Mixins(Vue, MixinI18n) {
  /**
   * Settings from store.
   */
  @State settings!: ALSearch.Settings;

  get search(): boolean {
    return this.settings.activity.search;
  }

  set search(value: boolean) {
    const s = Helpers.deepClone(this.settings);

    s.activity.search = value;

    this.$store.dispatch('updateSettings', s);
  }

  get visitedPages(): boolean {
    return this.settings.activity.visitedPages;
  }

  set visitedPages(value: boolean) {
    const s = Helpers.deepClone(this.settings);

    s.activity.visitedPages = value;

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
