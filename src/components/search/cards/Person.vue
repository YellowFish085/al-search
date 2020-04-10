<template>
  <!-- eslint-disable max-len -->
  <div v-if="data" class="card card--person" >
    <a :href="data.siteUrl"
       class="card__cover col col--justify-end h-full w-full"
       :style="{ 'background-image' : `url(${data.image.large})` }"
       @click="onClick">
      <div class="card__cover__overlay w-full">
        <a :href="data.siteUrl"
           class="card__cover__overlay__title w-full"
           @click="onClick">{{ data.name.full }}</a>
      </div>
    </a>
  </div>
  <!-- Placeholder -->
  <div v-else class="card card--person card--placeholder">
    <div class="card--placeholder__cover col col--justify-end h-full w-full">
      <div class="card--placeholder__cover__overlay w-full">
        <div class="card--placeholder__block card--placeholder__block--medium card--placeholder__block--no-margin"></div>
      </div>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Person extends Vue {
  @Prop() readonly data!: AniSearch.AniList.Character | AniSearch.AniList.Staff;

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

  &__cover {
    background-color: rgb(var(--color-text-lighter));
  }

  &--placeholder {
    &__cover {
      &__overlay {
        background-color: rgb(var(--color-foreground));
        padding: 12px;
      }
    }
  }
}
</style>
