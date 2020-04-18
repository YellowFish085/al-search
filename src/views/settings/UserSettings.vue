<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>{{ i18n('S_Account') }}</h2>

    <div class="container">
      <transition name="translate">
        <!-- Authenticated -->
        <div v-if="accessToken && user" key="logged-in" class="logged-in">
          <div class="row row--justify-start row-items-start">
            <SeeMyProfileButton size="lg" />
            <div class="details">
              <h3 v-html="i18n('S_LoggedInAs', user.name)"></h3>
              <div class="actions row row--justify-start row-items-start">
                <ButtonRefresh />
                <ButtonLogout />
              </div>
            </div>
          </div>
          <div class="row row--justify-between row--items-center">
            <p v-html="i18n('S_LoginDescription')"></p>
          </div>
        </div>

        <!-- Not authenticated -->
        <div v-else key="logged-out" class="logged-out">
          <div class="col col--justify-between col--items-start h-full">
            <div>
              <h3>{{ i18n('S_NotLoggedIn') }}</h3>
              <p>{{ i18n('S_NotLoggedInDescription') }}</p>
            </div>
            <div class="actions">
              <ButtonLogin />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ButtonLogin from '@/components/auth/ButtonLogin.vue';
import ButtonLogout from '@/components/auth/ButtonLogout.vue';
import ButtonRefresh from '@/components/auth/ButtonRefresh.vue';
import MixinI18n from '@/mixins/I18n';
import SeeMyProfileButton from '@/components/auth/SeeMyProfileButton.vue';

@Component({
  components: {
    ButtonLogin,
    ButtonLogout,
    ButtonRefresh,
    SeeMyProfileButton,
  },
})
export default class UserSettings extends Mixins(Vue, MixinI18n) {
  /**
   * Access token from store.
   */
  @State accessToken!: string | null;

  /**
   * User data from store.
   */
  @State user!: ALSearch.AniList.User | null;
}
</script>

<style lang="scss" scoped>
.container {
  height: 135px;
  position: relative;
}

.logged-in,
.logged-out {
  height: 105px;
  position: absolute;
}

.logged-in {
  .details {
    padding-left: 1.5rem;
  }

  .actions {
    > * {
      margin-right: 1rem;
    }
  }
}

.note {
  margin-top: 1rem;
}
</style>
