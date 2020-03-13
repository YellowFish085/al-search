<template>
  <button :title="title">
    <font-awesome-icon :icon="['fas', icon]" size="sm" />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  /**
   * FontAwesome icon class.
   */
  @Prop(String) readonly icon: string | undefined

  /**
   * Button title.
   */
  @Prop(String) readonly title: string | undefined
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
  transition: opacity 0.1s ease;

  svg {
    color: rgb(var(--color-text-bright));
  }

  &:hover {
    opacity: 1;
  }
}
</style>
