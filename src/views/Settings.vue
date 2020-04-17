<template>
  <!-- eslint-disable max-len -->
  <section>
    <div class="wrapper">
      <h1>{{ i18n('S_Settings') }}</h1>

      <!-- Account -->
      <UserSettings />

      <!-- Activity -->
      <ActivitySettings />

      <!-- Web integration -->
      <IntegrationSettings />

      <!-- Search -->
      <SearchSettings />

      <!-- Theme -->
      <ThemeSettings />

      <!-- Infos -->
      <Infos />

      <!-- About -->
      <About />
    </div>
  </section>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import About from '@/views/settings/About.vue';
import ActivitySettings from '@/views/settings/ActivitySettings.vue';
import Infos from '@/views/settings/Infos.vue';
import IntegrationSettings from '@/views/settings/IntegrationSettings.vue';
import MixinI18n from '@/mixins/I18n';
import SearchSettings from '@/views/settings/SearchSettings.vue';
import ThemeSettings from '@/views/settings/ThemeSettings.vue';
import UserSettings from '@/views/settings/UserSettings.vue';

@Component({
  components: {
    About,
    ActivitySettings,
    Infos,
    IntegrationSettings,
    SearchSettings,
    ThemeSettings,
    UserSettings,
  },
})
export default class Settings extends Mixins(Vue, MixinI18n) {}
</script>

<style lang="scss" scoped>
.wrapper {
  > div {
    margin-bottom: 30px;
  }
}
</style>
