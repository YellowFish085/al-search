<template>
  <!-- eslint-disable max-len -->
  <section>
    <div class="wrapper">
      <h1>{{ i18n('S_Error') }}</h1>

      <h2>{{ error.message }}</h2>
    </div>
  </section>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Vue,
} from 'vue-property-decorator';
import MixinI18n from '@/mixins/I18n';

@Component
export default class ErrorComponent extends Mixins(Vue, MixinI18n) {
  @Prop(Error) error!: Error;
}
</script>

<style lang="scss" scoped>
span {
  display: inline-block;
  margin-bottom: 0.2rem;
}
</style>
