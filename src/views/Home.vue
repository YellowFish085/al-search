<template>
  <!-- eslint-disable max-len -->
  <section id="home">
    <div class="wrapper">
      <h1>Activity</h1>

      <div id="activity_feed" class="col col--justify-start col--items-center">
        <Item v-for="data in activity" :key="data" :data="data" />
        <ButtonClear v-if="activity.length > 0" />
        <div v-else>
          <p>Nothing in your activity feed.</p>
        </div>
      </div>
    </div>
  </section>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Activity } from '@/store';
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ButtonClear from '@/components/activity/ButtonClear.vue';
import Item from '@/components/activity/Item.vue';

@Component({
  components: {
    ButtonClear,
    Item,
  },
})
export default class Home extends Vue {
  /**
   * Activity feed.
   */
  @State activity!: Activity[];
}
</script>

<style lang="scss" scoped>

</style>
