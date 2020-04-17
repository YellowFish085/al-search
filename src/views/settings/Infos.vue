<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>{{ i18n('S_Information') }}</h2>

    <div class="container">
      <h3>{{ i18n('S_Data') }}</h3>
      <p>{{ i18n('S_DataDescription') }}</p>

      <h3>{{ i18n('S_Activity') }}</h3>
      <p v-html="i18n('S_InformationActivityDescription')"></p>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import MixinI18n from '@/mixins/I18n';

@Component
export default class Infos extends Mixins(Vue, MixinI18n) {}
</script>

<style lang="scss" scoped>

</style>
