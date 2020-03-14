<template>
  <section id="settings">
    <div class="wrapper">
      <h1>Settings</h1>

      <!-- Account -->
      <UserSettings />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserSettings from '@/views/settings/UserSettings.vue';

@Component({
  components: {
    UserSettings,
  },
})
export default class Settings extends Vue {}
</script>

<style lang="scss" scoped>

</style>
