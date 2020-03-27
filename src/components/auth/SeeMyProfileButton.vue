<template>
  <!-- eslint-disable max-len -->
  <a v-if="user"
     :href="user.siteUrl"
     title="See my profile"
     :class="[ size ]"
     :style="{ 'background-image': `url(${user.avatar.medium})` }">
  </a>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class SeeMyProfileButton extends Vue {
  @Prop(String) size?: string;

  /**
   * User data from store.
   */
  @State user!: AniSearch.AniList.User | null;
}
</script>

<style lang="scss" scoped>
a {
  background-position: center;
  background-size: cover;
  border-radius: 3px;
  border: none;
  display: inline-block;
  height: 2rem;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  width: 2rem;

  &.lg {
    height: 4rem;
    width: 4rem;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
