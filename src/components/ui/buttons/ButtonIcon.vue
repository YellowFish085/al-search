<template>
  <!-- eslint-disable max-len -->
  <button :title="title" @click="e => onClick && onClick(e)">
    <font-awesome-icon :icon="['fas', icon]" :size="size || 'sm'" />
  </button>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ButtonIcon extends Vue {
  /**
   * FontAwesome icon class.
   */
  @Prop(String) readonly icon!: string

  /**
   * Button title.
   */
  @Prop(String) readonly title!: string

  /**
   * Icon size.
   */
  @Prop(String) readonly size?: string;

  /**
   * Click.
   */
  @Prop(Function) readonly onClick?: Function;
}
</script>

<style lang="scss" scoped>
button {
  background: inherit;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.5rem;

  &:hover {
    svg {
      color: rgb(var(--color-header-text-hover));
    }
  }
}

svg {
  color: rgb(119, 122, 158);
  transition: color 0.3s ease;
}
</style>
