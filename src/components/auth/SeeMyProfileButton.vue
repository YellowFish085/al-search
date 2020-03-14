<template>
  <a :href="user.siteUrl"
     title="See my profile"
     :class="[ size ]"
     :style="{ 'background-image': `url(${user.avatar.medium})` }">
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { UserSchema } from '@/anilist/graphql/user';

@Component
export default class SeeMyProfileButton extends Vue {
  @Prop(String) size?: string;

  /**
   * User data from store.
   */
  @State user!: UserSchema;
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
