<template>
  <!-- eslint-disable max-len -->
  <div class="row row--justify-end row--items-center">
    <div id="layout-cover"
         class="btn"
         :class="{ 'active': layout === layouts.COVER }"
         :data-id="layouts.COVER"
         @click="handleClick">
      <font-awesome-icon :icon="['fas', 'th']" size="sm" />
    </div>
    <div id="layout-chart"
         class="btn"
         :data-id="layouts.CHART"
         :class="{ 'active': layout === layouts.CHART }"
         @click="handleClick">
      <font-awesome-icon :icon="['fas', 'th-large']" size="sm" />
    </div>
    <div id="layout-table"
         class="btn"
         :class="{ 'active': layout === layouts.TABLE }"
         :data-id="layouts.TABLE"
         @click="handleClick">
      <font-awesome-icon :icon="['fas', 'th-list']" size="sm" />
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as Enum from '@/utils/Enum';
import Helpers from '@/utils/Helpers';

@Component
export default class CardLayoutSwitcher extends Vue {
  /**
   * Settings from store.
   */
  @State settings!: ALSearch.Settings;

  layouts = Enum.CardLayout;

  get layout(): string {
    return this.settings.search.layout;
  }

  handleClick(e: Event): void {
    const s = Helpers.deepClone(this.settings);

    s.search.layout = (e.currentTarget! as HTMLElement).getAttribute('data-id');

    this.$store.dispatch('updateSettings', s);
  }
}
</script>

<style lang="scss" scoped>
.btn {
  color: rgb(var(--color-gray-500));
  cursor: pointer;
  margin: 0 5px;
  transition: color 0.3s ease;

  &.active,
  &:hover {
    color: rgb(var(--color-gray-600));
  }
}
</style>
