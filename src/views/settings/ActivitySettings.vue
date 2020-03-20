<template>
  <!-- eslint-disable max-len -->
  <div id="settings__activity">
    <h2>Activity</h2>

    <div class="container">
      <div class="col col--justify-start col--items-start">
        <div class="w-full row row--justify-between row--items-start">
          <div class="col col--justify-start col--items-start">
            <div class="field">
              <input type="checkbox"
                    name="search"
                    id="settings__activity__search"
                    v-model="search">
              <label for="settings__activity__search">Save search <font-awesome-icon :icon="['fas', 'search']" size="xs" class="icon blue" /></label>
            </div>
            <div class="field">
              <input type="checkbox"
                    name="visitedPages"
                    id="settings__activity__visitedPages"
                    v-model="visitedPages">
              <label for="settings__activity__visitedPages">Save visited pages <font-awesome-icon :icon="['fas', 'external-link-alt']" size="xs" class="icon blue" /></label>
            </div>
          </div>
          <ButtonClear />
        </div>
        <p class="note"><b>AniSearch</b> can save your search history and visited pages (anime, manga, studio, character and staff). This is here to help you quickly go back to a previous search or a previously visited page.</p>
      </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Settings } from '@/store';
import { State } from 'vuex-class';
import ButtonClear from '@/components/activity/ButtonClear.vue';

@Component({
  components: {
    ButtonClear,
  },
})
export default class ActivitySettings extends Vue {
  /**
   * Settings from store.
   */
  @State settings!: Settings;

  get search(): boolean {
    return this.settings.activity.search;
  }

  set search(value: boolean) {
    const s = JSON.parse(JSON.stringify(this.settings));

    s.activity.search = value;

    this.$store.dispatch('updateSettings', s);
  }

  get visitedPages(): boolean {
    return this.settings.activity.visitedPages;
  }

  set visitedPages(value: boolean) {
    const s = JSON.parse(JSON.stringify(this.settings));

    s.activity.visitedPages = value;

    this.$store.dispatch('updateSettings', s);
  }
}
</script>

<style lang="scss" scoped>
#settings__activity {
  .field {
    margin-bottom: 0.25rem;

    input {
      cursor: pointer;
    }

    label {
      margin-left: 0.5rem;
      font-size: 0.9rem;
    }
  }
}
</style>
