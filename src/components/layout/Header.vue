<template>
  <!-- eslint-disable max-len -->
  <header :class="{ searching: isSearching }">
    <div class="wrapper">
      <div class="btn-wrapper row row--justify-center row--items-center">
        <div class="btn h-full w-full">
          <transition name="translate-small">
            <router-link to="/settings" v-if="!isSettingsPage" key="settings" class="h-full w-full row row--justify-center row--items-center">
              <ButtonIcon icon="cogs" :title="i18n('S_Settings')" size="lg" />
            </router-link>
            <router-link to="/" v-else key="back" class="h-full w-full row row--justify-center row--items-center">
              <ButtonIcon icon="chevron-left" :title="i18n('S_BackToHome')" size="lg" />
            </router-link>
          </transition>
        </div>
      </div>
      <div class="btn-wrapper row row--justify-center row--items-center">
        <div class="btn h-full w-full">
          <div class="h-full w-full row row--justify-center row--items-center">
            <SeeMyProfileButton />
          </div>
        </div>
      </div>
    </div>
    <SearchForm @searching="handleSearching" />
  </header>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue';
import MixinI18n from '@/mixins/I18n';
import SearchForm from '@/components/search/SearchForm.vue';
import SeeMyProfileButton from '@/components/auth/SeeMyProfileButton.vue';

@Component({
  components: {
    ButtonIcon,
    SearchForm,
    SeeMyProfileButton,
  },
})
export default class Header extends Mixins(Vue, MixinI18n) {
  /** Searching? */
  isSearching = false;

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
  height: 85px;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  .btn-wrapper {
    height: 50px;
    position: absolute;
    top: 0;
    width: 40px;
    z-index: 11;

    &:first-child {
      left: 0;
    }

    &:last-child {
      right: 0;
    }

  }

  .btn {
    position: relative;
    transform: scale(1);
    transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    > * {
      position: absolute;
    }
  }

  &.searching {
    .btn {
      transform: scale(0.8);
    }
  }
}
</style>
