<template>
  <!-- eslint-disable max-len -->
  <section>
    <div class="wrapper">
      <h1>Settings</h1>

      <!-- Account -->
      <UserSettings />

      <!-- Activity -->
      <ActivitySettings />

      <!-- Web integration -->
      <IntegrationSettings />

      <!-- Search -->
      <SearchSettings />

      <!-- Infos -->
      <Infos />
    </div>
  </section>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ActivitySettings from '@/views/settings/ActivitySettings.vue';
import Infos from '@/views/settings/Infos.vue';
import IntegrationSettings from '@/views/settings/IntegrationSettings.vue';
import SearchSettings from '@/views/settings/SearchSettings.vue';
import UserSettings from '@/views/settings/UserSettings.vue';

@Component({
  components: {
    ActivitySettings,
    Infos,
    IntegrationSettings,
    SearchSettings,
    UserSettings,
  },
})
export default class Settings extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  > div {
    margin-bottom: 30px;
  }
}
</style>
