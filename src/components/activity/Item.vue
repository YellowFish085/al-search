<template>
  <div class="activity w-full" v-on:click="handleClick" :title="title">
    <div class="row row--justify-start row--items-center">
      <font-awesome-icon :icon="['fas', icon]" size="sm" class="icon blue" />
      <div class="activity__label">
        <span>{{ data.label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Activity, ActivityType } from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Item extends Vue {
  @Prop() data!: Activity;

  /**
   * Return title string.
   */
  get title(): string {
    switch (this.data.type) {
      case ActivityType.SEARCH:
        return `Search for ${this.data.value}`;

      case ActivityType.VISITED_PAGE:
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
      case ActivityType.SEARCH:
        return 'search';

      case ActivityType.VISITED_PAGE:
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
      case ActivityType.SEARCH:
        // TODO
        break;

      case ActivityType.VISITED_PAGE:
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

  .activity__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
