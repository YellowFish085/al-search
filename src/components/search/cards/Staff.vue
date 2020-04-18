<template>
  <!-- eslint-disable max-len -->
  <CardPerson :data="data" :onClick="handleClick" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as Enum from '@/utils/Enum';
import CardPerson from '@/components/search/cards/Person.vue';
import MixinSaveActivity from '@/mixins/Activity';

@Component({
  components: {
    CardPerson,
  },
})
export default class Staff extends Mixins(Vue, MixinSaveActivity) {
  @State('settings') settings!: ALSearch.Settings;

  @Prop() readonly data!: ALSearch.AniList.Staff;

  handleClick(e: Event): void {
    e.stopPropagation();
    e.preventDefault();

    if (this.settings.activity.visitedPages) {
      const activity: ALSearch.Activity.Activity = {
        type: Enum.ActivityType.VISITED_PAGE,
        label: this.data!.name.full,
        value: this.data!.siteUrl,
        params: {
          type: Enum.SearchType.STAFF,
        },
      };

      this.saveActivity(activity);
    }

    window.open(this.data!.siteUrl);
  }
}
</script>

<style lang="scss" scoped>

</style>
