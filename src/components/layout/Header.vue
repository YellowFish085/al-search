<template>
  <header>
    <div class="wrapper">
      <div class="row row--justify-between row--items-center">
        <div class="btn">
          <div class="btn__wrapper">
            <router-link to="/settings">
              <Button icon="cogs" title="Settings" />
            </router-link>
          </div>
        </div>
        <span>search input</span>
        <div class="btn">
          <div class="btn__wrapper" v-on:click="handleLoginClick">
            <Button icon="user-circle" title="Login" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/layout/header/Button.vue';

@Component({
  components: {
    Button,
  },
})
export default class Header extends Vue {
  /**
   * Start login process.
   *
   * @return void
   */
  handleLoginClick(): void {
    // TODO: Implement login
    console.log('TODO: start login');
  }
}
</script>

<style lang="scss" scoped>
header {
  background: rgb(var(--color-overlay));
  height: 50px;
  width: 100%;

  .row {
    height: 100%;

    .wrapper {
      height: 100%;
    }

    .btn {
      width: 1.25em;

      &__wrapper {
        transform: scale(1);
        transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
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
