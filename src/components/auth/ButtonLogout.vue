<template>
  <!-- eslint-disable max-len -->
  <ButtonBorder content="Logout"
                title="Logout"
                :onClick="handleClick"
                :disabled="disabled" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import ButtonBorder from '@/components/ui/buttons/ButtonBorder.vue';
import MixinNotify from '@/mixins/Notify';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component({
  components: {
    ButtonBorder,
  },
})
export default class ButtonLogout extends Mixins(Vue, MixinNotify) {
  /**
   * Disable button.
   */
  disabled = false;

  async handleClick() {
    this.disabled = true;

    // Let the background script handle the logout process.
    const response = await browser.runtime.sendMessage({ code: 'USER_LOGOUT' });

    switch (response.code) {
      case 'USER_LOGOUT_SUCCESS':
        await this.$store.dispatch('logout');

        this.notify('success', 'Logged out', 'Don\'t forget to remove the access token in your AniList > Apps setting page.');
        break;

      case 'USER_LOGOUT_FAILED':
      default:
        this.notify('error', 'Logout failure:', response.message);
        break;
    }

    this.disabled = false;
  }
}
</script>

<style lang="scss" scoped>

</style>
