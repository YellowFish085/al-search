<template>
  <!-- eslint-disable max-len -->
  <ButtonBg :content="i18n('S_Login')"
            :title="i18n('S_Login')"
            :onClick="handleClick"
            :disabled="disabled"
            size="lg" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import ButtonBg from '@/components/ui/buttons/ButtonBg.vue';
import MixinI18n from '@/mixins/I18n';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component({
  components: {
    ButtonBg,
  },
})
export default class ButtonLogin extends Mixins(Vue, MixinI18n) {
  /**
   * Disable button.
   */
  disabled = false;

  async handleClick() {
    this.disabled = true;

    // Let the background script handle the auth process, that way
    // if the popup is closed the auth process will continue.
    const response = await browser.runtime.sendMessage({ code: 'AUTH_START' });

    // In case popup wasn't closed (it happens if the auth flow auto
    // resolve if the user already gave permissions), update the store.
    switch (response.code) {
      case 'AUTH_SUCCESS':
        this.$store.dispatch('refreshUserData');
        break;

      case 'AUTH_FAILED':
      default:
        break;
    }

    this.disabled = false;
  }
}
</script>

<style lang="scss" scoped>

</style>
