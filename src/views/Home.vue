<template>
  <!-- eslint-disable max-len -->
  <section>
    <div class="wrapper">
      <h1>{{ i18n('S_Activity') }}</h1>

      <div class="activity-feed col col--justify-start col--items-center">
        <Item v-for="data in activityFeed" :key="data" :data="data" />
        <ButtonClear v-if="activityFeed && activityFeed.length > 0" />
        <template v-else>
          <div class="container">
            <span>{{ i18n('S_ActivityEmpty') }}</span>
          </div>
        </template>
      </div>
    </div>
  </section>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ButtonClear from '@/components/activity/ButtonClear.vue';
import Item from '@/components/activity/Item.vue';
import MixinI18n from '@/mixins/I18n';

@Component({
  components: {
    ButtonClear,
    Item,
  },
})
export default class Home extends Mixins(Vue, MixinI18n) {
  /**
   * Activity feed.
   */
  @State activityFeed!: AniSearch.Activity.Activity[] | null;
}
</script>

<style lang="scss" scoped>
.activity-feed {
  > * {
    &:last-child {
      margin-top: 25px;
    }
  }
}
</style>
