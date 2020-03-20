<template>
  <!-- eslint-disable max-len -->
  <section id="error">
    <div class="wrapper">
      <h1>Error</h1>

      <h2>{{ error.message }}</h2>
    </div>
  </section>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ErrorComponent extends Vue {
  @Prop(Error) error!: Error;
}
</script>

<style lang="scss" scoped>
#error {
  span {
    display: inline-block;
    margin-bottom: 0.2rem;
  }
}
</style>
