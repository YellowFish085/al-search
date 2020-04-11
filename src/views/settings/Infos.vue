<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>Informations</h2>

    <div class="container">
      <h3>Data</h3>
      <p>We do not collect any of your data in any way, we don't care what you're whatching or reading. Just enjoy this extension :)</p>

      <h3>Activity</h3>
      <p>Search history and visited pages are stored locally, on your browser.</p>
      <p>This means that if you have <b>AniSearch</b> installed in multiple browsers on the same computer, or in multiple browsers on different computers, each <b>AniSearch</b> extension will have its own activity feed.</p>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Infos extends Vue {}
</script>

<style lang="scss" scoped>

</style>
