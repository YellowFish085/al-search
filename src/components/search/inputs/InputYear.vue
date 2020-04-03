<template>
  <!-- eslint-disable max-len -->
  <select v-model="value"
          name="search_year"
          id="search_year"
          :class="{ active: value, disabled: invalidType || disabled }"
          title="Filter by year"
          :disabled="invalidType || disabled"
          @change="$emit('update:value', $event.target.value || null)">
    <option :value="null">All years</option>
    <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
  </select>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as Enum from '@/utils/Enum';

@Component
export default class InputYear extends Vue {
  /** Search type */
  @Prop(String) type!: Enum.SearchType;

  /** Value */
  @Prop(String) value?: number | null;

  /** Disabled */
  @Prop(Boolean) disabled!: boolean;

  /** Search years. */
  years = new Array(new Date().getFullYear() - 1950 + 1)
    .fill(undefined)
    .map((value, index) => index + 1950);

  /**
   * Disabled?
   */
  get invalidType(): boolean {
    return ![Enum.SearchType.ANIME, Enum.SearchType.MANGA].includes(this.type);
  }
}
</script>

<style lang="scss" scoped>
select {
  appearance: none;
  background: inherit;
  border: none;
  color: rgb(var(--color-text-bright));
  cursor: pointer;
  display: block;

  &:not(.active) {
    font-style: italic;
    opacity: 0.6;
  }

  &.disabled {
    cursor: initial !important;
    opacity: 0.4 !important;
    pointer-events: none !important;
  }

  option {
    color: initial;
    font-style: initial;
  }
}
</style>
