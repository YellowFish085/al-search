<template>
  <button :title="title">
    <font-awesome-icon :icon="['fas', icon]" :size="size || 'sm'" />
  </button>
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
}
</script>

<style lang="scss" scoped>
button {
  background: inherit;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  opacity: 0.8;
  padding: 0.5rem;
  transition: opacity 0.2s ease;

  svg {
    color: rgb(var(--color-text-bright));
  }

  &:hover {
    opacity: 1;
  }
}
</style>
