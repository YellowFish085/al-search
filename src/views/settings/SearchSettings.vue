<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>Search</h2>

    <div class="container">
      <div class="col col--justify-start col--items-start">
        <div class="w-full row row--justify-between row--items-start">
          <div class="col col--justify-start col--items-start">
            <div class="field">
              <input type="checkbox"
                     name="onListFirst"
                     id="settings__activity__onListFirst"
                     v-model="onListFirst">
              <label for="settings__activity__onListFirst">Display search from your list first</label>
            </div>
            <p>Wether to display search results from your personal lists or global search results first</p>
          </div>
        </div>
      </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class SearchSettings extends Vue {
  /**
   * Settings from store.
   */
  @State settings!: AniSearch.Settings;

  get onListFirst(): boolean {
    return this.settings.search.onListFirst;
  }

  set onListFirst(value: boolean) {
    const s = JSON.parse(JSON.stringify(this.settings));

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
  margin-left: 0.5rem;
  font-size: 1.4rem;
}
</style>
