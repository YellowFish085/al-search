<template>
  <!-- eslint-disable max-len -->
  <div v-if="data" class="card card--person" >
    <a :href="data.siteUrl"
      :title="i18n('S_SeeOnAnilist', data.name.full)"
       class="cover col col--justify-end h-full w-full"
       :style="{ 'background-image' : `url(${data.image.large})` }"
       @click="onClick">
      <div class="overlay w-full">
        <a :href="data.siteUrl"
           :title="i18n('S_SeeOnAnilist', data.name.full)"
           class="title w-full"
           @click="onClick">{{ data.name.full }}</a>
      </div>
    </a>
  </div>
  <!-- Placeholder -->
  <div v-else class="card card--placeholder card--person">
    <div class="cover col col--justify-end h-full w-full">
      <div class="overlay w-full">
        <div class="block block--medium block--no-margin"></div>
      </div>
    </div>
  </div>
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
export default class Person extends Mixins(Vue, MixinI18n) {
  @Prop() readonly data!: ALSearch.AniList.Character | ALSearch.AniList.Staff;

  /**
   * Click.
   */
  @Prop(Function) readonly onClick!: Function;
}
</script>

<style lang="scss" scoped>
.card {
  height: 185px;
  margin-bottom: 12.5px;
  width: 130px;

  &--placeholder {
    .overlay {
      background-color: rgb(var(--color-foreground));
      padding: 12px;
    }
  }
}

.cover {
  background-color: rgb(var(--color-text-lighter));
}
</style>
