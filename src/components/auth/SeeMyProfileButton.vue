<template>
  <!-- eslint-disable max-len -->
  <transition name="quick-fade">
    <a v-if="user"
      :href="user.siteUrl"
      title="See my profile"
      :class="[ size ]"
      :style="{ 'background-image': `url(${user.avatar.medium})` }">
    </a>
  </transition>
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
  @State user!: AniListSearch.AniList.User | null;
}
</script>

<style lang="scss" scoped>
.quick-fade-enter-active, .quick-fade-leave-active {
  transition: opacity 0.2s;
}
.quick-fade-enter, .quick-fade-leave-to {
  opacity: 0;
}

a {
  background-position: center;
  background-size: cover;
  border-radius: 3px;
  border: none;
  display: inline-block;
  height: 2.5rem;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  width: 2.5rem;

  &.lg {
    height: 4rem;
    width: 4rem;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
