<template>
  <!-- eslint-disable max-len -->
  <notifications group="al-search" animation-type="css" position="bottom center">
    <template slot="body" slot-scope="props">
      <div class="notification" :class="[props.item.type]">
        <div class="header row row--justify-between row--items-start">
          <div class="title">
            <span>{{ props.item.title }}</span>
          </div>
          <div class="close" @click="props.close" >
            <font-awesome-icon :icon="['fas', 'times']" size="sm" />
          </div>
        </div>
        <div class="text">
          <p>{{ props.item.text }}</p>
        </div>
      </div>
    </template>
  </notifications>
  <!-- eslint-enable max-len -->
</template>

<style lang="scss" scoped>
.notification-group {
  z-index: 9999;
}

.notification {
  background-color: rgb(var(--color-foreground));
  border-radius: 3px;
  color: rgb(var(--color-text));
  margin-bottom: 0.2rem;
  padding: 0.2em;

  &.error {
    border: 2px solid rgb(var(--color-red));
  }

  &.success {
    border: 2px solid rgb(var(--color-green));
  }

  &.warn {
    border: 2px solid rgb(var(--color-orange));
  }
}

.header {
  padding: 0.5rem;
}

.title {
  font-size: 1.2rem;
  font-weight: 500;
}

.close {
  cursor: pointer;
  padding-left: 1rem;
}

.text {
  font-size: 0.8rem;
  padding: 0.5rem;

  p {
    color: rgb(var(--color-text-lighter));
    margin: 0;
  }
}
</style>
