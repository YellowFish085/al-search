<template>
  <!-- eslint-disable max-len -->
  <ButtonBorder :content="i18n('S_Logout')"
                :title="i18n('S_Logout')"
                :onClick="handleClick"
                :disabled="disabled" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import ButtonBorder from '@/components/ui/buttons/ButtonBorder.vue';
import MixinI18n from '@/mixins/I18n';
import MixinNotify from '@/mixins/Notify';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component({
  components: {
    ButtonBorder,
  },
})
export default class ButtonLogout extends Mixins(Vue, MixinI18n, MixinNotify) {
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

        this.notify('success', this.i18n('S_Success'), this.i18n('N_LogoutSuccess'));
        break;

      case 'USER_LOGOUT_FAILED':
      default:
        this.notify('error', this.i18n('S_Error'), response.message);
        break;
    }

    this.disabled = false;
  }
}
</script>

<style lang="scss" scoped>

</style>
