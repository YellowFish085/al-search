<template>
  <button :title="title"
          v-on:click="onClick"
          :class="[ disabled ? 'disabled' : '', size ]">
    <span>{{ content }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  /**
   * Button content.
   */
  @Prop(String) readonly content!: string;

  /**
   * Button title.
   */
  @Prop(String) readonly title!: string;

  /**
   * Click.
   */
  @Prop(Function) readonly onClick!: Function;

  /**
   * Button disabled?
   */
  @Prop(Boolean) readonly disabled: boolean = false;

  /**
   * Size.
   */
  @Prop(String) readonly size?: string;
}
</script>

<style lang="scss" scoped>
button {
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.6rem 1.3rem;
  text-transform: uppercase;
  transition: opacity .1s ease;

  &.lg {
    font-size: 1.2rem;
    padding: 0.7rem 1.8rem;
  }

  &.disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
