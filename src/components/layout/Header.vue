<template>
  <header>
    <div class="wrapper">
      <div class="row row--justify-between row--items-center">
        <div class="btn">
          <div class="btn__wrapper">
            <router-link to="/settings">
              <ButtonIcon icon="cogs" title="Settings" />
            </router-link>
          </div>
        </div>
        <span>search input</span>
        <div class="btn">
          <div class="btn__wrapper">
            <SeeMyProfileButton v-if="accessToken" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue';
import SeeMyProfileButton from '@/components/auth/SeeMyProfileButton.vue';

@Component({
  components: {
    ButtonIcon,
    SeeMyProfileButton,
  },
})
export default class Header extends Vue {
  /**
   * User access token.
   */
  @State accessToken!: string|null;
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

  .wrapper {
    height: 100%;
  }

  .row {
    height: 100%;
  }

  .btn {
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
