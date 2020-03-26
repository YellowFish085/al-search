<template>
  <!-- eslint-disable max-len -->
  <div>
    <input v-model="value"
           :value="types.ANIME"
           type="radio"
           :id="`search_type_${types.ANIME}`"
           @change="$emit('update:value', $event.target.value)">
    <label :for="`search_type_${types.ANIME}`" :class="{ active: value === types.ANIME }">Anime</label>

    <input v-model="value"
           :value="types.MANGA"
           type="radio"
           :id="`search_type_${types.MANGA}`"
           @change="$emit('update:value', $event.target.value)">
    <label :for="`search_type_${types.MANGA}`" :class="{ active: value === types.MANGA }">Manga</label>

    <input v-model="value"
           :value="types.STUDIOS"
           type="radio"
           :id="`search_type_${types.STUDIOS}`"
           @change="$emit('update:value', $event.target.value)">
    <label :for="`search_type_${types.STUDIOS}`" :class="{ active: value === types.STUDIOS }">Studios</label>

    <input v-model="value"
           :value="types.CHARACTERS"
           type="radio"
           :id="`search_type_${types.CHARACTERS}`"
           @change="$emit('update:value', $event.target.value)">
    <label :for="`search_type_${types.CHARACTERS}`" :class="{ active: value === types.CHARACTERS }">Characters</label>

    <input v-model="value"
           :value="types.STAFF"
           type="radio"
           :id="`search_type_${types.STAFF}`"
           @change="$emit('update:value', $event.target.value)">
    <label :for="`search_type_${types.STAFF}`" :class="{ active: value === types.STAFF }">Staff</label>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as Enum from '@/utils/Enum';

@Component
export default class InputType extends Vue {
  /** Value */
  @Prop(String) value!: Enum.SearchType;

  /** Search types. */
  types = Enum.SearchType;
}
</script>

<style lang="scss" scoped>
input {
  display: none;
}

label {
  cursor: pointer;
  margin: 0 0.2rem;
  transition: opacity .1s ease-in-out;

  &:not(.active) {
    opacity: 0.6;
  }
}
</style>
