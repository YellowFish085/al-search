<template>
  <!-- eslint-disable max-len -->
  <header :class="{ searching: isSearching }">
    <div class="wrapper">
      <div class="btn btn--settings row row--justify-center row--items-center">
        <div class="btn__wrapper row row--justify-center row--items-center">
          <router-link to="/settings" v-if="!isSettingsPage">
            <ButtonIcon icon="cogs" title="Settings" />
          </router-link>
          <router-link to="/" v-else>
            <ButtonIcon icon="chevron-left" title="Back to home" />
          </router-link>
        </div>
      </div>
      <div class="btn btn--profile row row--justify-center row--items-center">
        <div class="btn__wrapper">
          <SeeMyProfileButton v-if="accessToken" />
        </div>
      </div>
    </div>
    <SearchForm @searching="handleSearching" />
  </header>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue';
import SearchForm from '@/components/search/SearchForm.vue';
import SeeMyProfileButton from '@/components/auth/SeeMyProfileButton.vue';

@Component({
  components: {
    ButtonIcon,
    SearchForm,
    SeeMyProfileButton,
  },
})
export default class Header extends Vue {
  /** Searching? */
  isSearching = false;

  /**
   * User access token.
   */
  @State accessToken!: string|null;

  /**
   * Are we on settings pages?
   */
  get isSettingsPage(): boolean {
    return this.$route.path === '/settings';
  }

  /**
   * Handle searching event from search input.
   */
  handleSearching(searching: boolean) {
    this.isSearching = searching;
  }
}
</script>

<style lang="scss" scoped>
header {
  background: rgb(var(--color-overlay));
  height: 50px;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  .btn {
    height: 50px;
    position: absolute;
    top: 0;
    width: 40px;
    z-index: 11;

    &--settings {
      left: 0;
    }

    &--profile {
      right: 0;
    }

    &__wrapper {
      transform: scale(1);
      transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }

  &.searching {
    .btn {
      &__wrapper {
        transform: scale(0.8);
      }
    }
  }
}
</style>
