<template>
  <div class="activity w-full" :title="title" @click="handleClick">
    <div class="row row--justify-start row--items-center">
      <font-awesome-icon :icon="['fas', icon]" size="sm" class="icon blue" />
      <div class="label w-full">
        <span>{{ data.label }}</span>
      </div>
      <div class="params">
        <span>{{ paramsString }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Vue,
} from 'vue-property-decorator';
import * as Enum from '@/utils/Enum';
import Helpers from '@/utils/Helpers';
import MixinsI18n from '@/mixins/I18n';

@Component
export default class Item extends Mixins(Vue, MixinsI18n) {
  @Prop() data!: ALSearch.Activity.Activity;

  /**
   * Return title string.
   */
  get title(): string {
    switch (this.data.type) {
      case Enum.ActivityType.SEARCH:
        return this.i18n('S_SearchFor', this.data.value);

      case Enum.ActivityType.VISITED_PAGE:
        return this.i18n('S_SeeOnAniList', this.data.label);

      default:
        return '';
    }
  }

  /**
   * Return FontAwesome icon based on activity type.
   */
  get icon(): string {
    switch (this.data.type) {
      case Enum.ActivityType.SEARCH:
        return 'search';

      case Enum.ActivityType.VISITED_PAGE:
        return 'external-link-alt';

      default:
        return '';
    }
  }

  /**
   * Return search params as string.
   */
  get paramsString(): string {
    if (!this.data.params) return '';

    const parts = [];

    // Add type part.
    parts.push(this.i18n(`ENUM_${this.data.params!.type}`));

    // Add year part if present.
    if (this.data.params!.year) parts.push(this.data.params!.year);

    // Add season part if present.
    if (this.data.params!.season) parts.push(this.i18n(`ENUM_${this.data.params!.season}`));

    return parts.join(' / ');
  }

  /**
   * Handle activity click.
   */
  handleClick() {
    switch (this.data.type) {
      case Enum.ActivityType.SEARCH:
        this.$store.dispatch('searchFromActivity', Helpers.deepClone(this.data));
        break;

      case Enum.ActivityType.VISITED_PAGE:
        window.open(this.data.value as string);
        break;

      default:
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
.activity {
  background-color: rgb(var(--color-foreground));
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.8rem;
  transition: color 0.2s ease-in-out;

  svg {
    margin-right: 1rem;
  }

  &:hover {
    color: rgb(var(--color-blue));
  }
}

.label {
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.params {
  color: rgb(var(--color-text-lighter));
  font-size: 1.1rem;
  font-weight: lighter;
  text-transform: capitalize;
  white-space: nowrap;
}
</style>
