<template>
  <!-- eslint-disable max-len -->
  <select v-model="value"
          name="search_season"
          id="search_season"
          :class="{ active: value }"
          title="Filter by season"
          :disabled="disabled"
          @change="$emit('update:value', $event.target.value)">
    <option :value="null">All seasons</option>
    <option v-for="y in seasons" :key="y" :value="y">{{ y }}</option>
  </select>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as Enum from '@/utils/Enum';

@Component
export default class InputSeason extends Vue {
  /** Search type */
  @Prop(String) type!: Enum.SearchType;

  /** Value */
  @Prop(String) value!: Enum.SearchSeason | null;

  /** Search season. */
  seasons = Enum.SearchSeason;

  /**
   * Disabled?
   */
  get disabled(): boolean {
    return ![Enum.SearchType.ANIME].includes(this.type);
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
  text-align: right;

  &:not(.active) {
    font-style: italic;
    opacity: 0.6;
  }

  option {
    color: initial;
    font-style: initial;
  }
}
</style>
