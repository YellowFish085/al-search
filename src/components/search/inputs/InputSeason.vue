<template>
  <!-- eslint-disable max-len -->
  <select v-model="value"
          name="search_season"
          id="search_season"
          :class="{ active: value, disabled: invalidType || disabled }"
          :title="i18n('S_FilterBySeason')"
          :disabled="invalidType || disabled"
          @change="$emit('update:value', $event.target.value || null)">
    <option :value="null">{{ i18n('S_AllSeasons') }}</option>
    <option v-for="y in seasons" :key="y" :value="y">{{ i18n(`ENUM_${y}`) }}</option>
  </select>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Vue,
} from 'vue-property-decorator';
import * as Enum from '@/utils/Enum';
import MixinI18n from '@/mixins/I18n';

@Component
export default class InputSeason extends Mixins(Vue, MixinI18n) {
  /** Search type */
  @Prop(String) type!: Enum.SearchType;

  /** Value */
  @Prop(String) value!: Enum.SearchSeason | null;

  /** Disabled */
  @Prop(Boolean) disabled!: boolean;

  /** Search season. */
  seasons = Enum.SearchSeason;

  /**
   * Disabled?
   */
  get invalidType(): boolean {
    return ![Enum.SearchType.ANIME].includes(this.type);
  }
}
</script>

<style lang="scss" scoped>
select {
  appearance: none;
  background: inherit;
  border: none;
  color: rgb(var(--color-header-text));
  cursor: pointer;
  display: block;
  text-align: right;
  transition: color 0.3s ease, opacity .1s ease-in-out;

  &:hover {
    color: rgb(var(--color-header-text-hover));
  }

  &:not(.active) {
    font-style: italic;
    opacity: 0.6;
  }

  &.disabled {
    cursor: initial !important;
    opacity: 0.4 !important;
    pointer-events: none !important;
  }
}

option {
  color: initial;
  font-style: initial;
}
</style>
