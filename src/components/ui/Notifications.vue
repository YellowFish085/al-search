<template>
  <!-- eslint-disable max-len -->
  <notifications group="anisearch" animation-type="css" position="bottom center">
    <template slot="body" slot-scope="props">
      <div class="notification" :class="[props.item.type]">
        <div class="notification__header row row--justify-between row--items-start">
          <div class="notification__title">
            <span>{{ props.item.title }}</span>
          </div>
          <div class="notification__close" @click="props.close" title="Close notification">
            <font-awesome-icon :icon="['fas', 'times']" size="sm" />
          </div>
        </div>
        <div class="notification__text">
          <p>{{ props.item.text }}</p>
        </div>
      </div>
    </template>
  </notifications>
  <!-- eslint-enable max-len -->
</template>

<style lang="scss" scoped>
.notification {
  border-radius: 3px;
  color: rgb(var(--color-white));
  margin-bottom: 0.2rem;

  &__header {
    padding: 0.5rem;
  }

  &__title {
    font-size: 0.9rem;
    font-weight: 500;
  }

  &__close {
    cursor: pointer;
    padding-left: 1rem;
  }

  &__text {
    font-size: 0.8rem;
    padding: 0.5rem;

    p {
      margin: 0;
    }
  }

  &.error {
    background-color: rgb(var(--color-red));
  }

  &.success {
    background-color: rgb(var(--color-green));
  }

  &.warn {
    background-color: rgb(var(--color-orange));
  }
}
</style>
