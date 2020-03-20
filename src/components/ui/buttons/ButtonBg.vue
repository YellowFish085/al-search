<template>
  <!-- eslint-disable max-len -->
  <Button :content="content"
          :title="title"
          :onClick="onClick"
          :disabled="disabled"
          :size="size" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Button from '@/components/ui/buttons/Button.vue';

@Component({
  components: {
    Button,
  },
})
export default class ButtonBg extends Vue {
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
  background: rgb(var(--color-blue));
  border: none;
  color: rgb(var(--color-white));
}
</style>
