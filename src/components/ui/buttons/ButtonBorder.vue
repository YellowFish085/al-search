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
export default class ButtonBorder extends Vue {
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
  background-color: rgb(var(--color-foreground));
  border: 1px solid rgba(var(--color-text), 0.2);
  color: rgb(var(--color-blue));
}
</style>
