<template>
  <div class="activity w-full" :title="title" @click="handleClick">
    <div class="row row--justify-start row--items-center">
      <font-awesome-icon :icon="['fas', icon]" size="sm" class="icon blue" />
      <div class="activity__label w-full">
        <span>{{ data.label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as Enum from '@/utils/Enum';

@Component
export default class Item extends Vue {
  @Prop() data!: AniSearch.Activity.Activity;

  /**
   * Return title string.
   */
  get title(): string {
    switch (this.data.type) {
      case Enum.ActivityType.SEARCH:
        return `Search for ${this.data.value}`;

      case Enum.ActivityType.VISITED_PAGE:
        return `See ${this.data.label} on AniList`;

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
   * Handle activity click.
   */
  handleClick() {
    switch (this.data.type) {
      case Enum.ActivityType.SEARCH:
        // TODO
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

  svg {
    margin-right: 1rem;
  }

  &__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
