<template>
  <h2 @click="onClick">
    <span>{{ title }}</span>
    <div class="btn">
      <transition :name="displayed ? 'fall-small' : 'climb-small'">
        <ButtonIcon v-if="displayed" key="display" icon="chevron-down" :title="i18n('')" size="lg"/>
        <ButtonIcon v-else icon="chevron-up" key="hide" :title="i18n('')" size="lg"/>
      </transition>
    </div>
  </h2>
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Vue,
} from 'vue-property-decorator';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue';
import MixinI18n from '@/mixins/I18n';

@Component({
  components: {
    ButtonIcon,
  },
})
export default class ListTitle extends Mixins(Vue, MixinI18n) {
  /**
   * List title.
   */
  @Prop(String) readonly title!: string;

  /**
   * List displayed?
   */
  @Prop(Boolean) readonly displayed!: boolean;

  /**
   * Click.
   */
  @Prop(Function) readonly onClick!: Function;
}
</script>

<style lang="scss" scoped>
h2 {
  align-items: stretch;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 12.5px;
  user-select: none;
}

.btn {
  position: relative;

  > * {
    position: absolute;
    right: 0;
    top: -0.5rem;
  }
}
</style>
