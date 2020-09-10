<template>
  <!-- eslint-disable max-len -->
  <CardCover v-if="settings.search.layout === layouts.COVER" :data="data" />
  <CardTable v-else-if="settings.search.layout === layouts.TABLE" :data="data" />
  <CardChart v-else :data="data" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as Enum from '@/utils/Enum';
import CardChart from '@/components/search/cards/media/Chart.vue';
import CardCover from '@/components/search/cards/media/Cover.vue';
import CardTable from '@/components/search/cards/media/Table.vue';

@Component({
  components: {
    CardChart,
    CardCover,
    CardTable,
  },
})
export default class Media extends Vue {
  @State('settings') settings!: ALSearch.Settings;

  @Prop() readonly data?: ALSearch.AniList.Media;

  /** Layout types. */
  layouts = Enum.CardLayout;
}
</script>

<style lang="scss" scoped>

</style>
