<template>
  <!-- eslint-disable max-len -->
  <ButtonBg :content="i18n('S_Refresh')"
            :title="i18n('S_RefreshMyData')"
            :onClick="handleClick"
            :disabled="disabled" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import ButtonBg from '@/components/ui/buttons/ButtonBg.vue';
import MixinI18n from '@/mixins/I18n';
import MixinNotify from '@/mixins/Notify';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component({
  components: {
    ButtonBg,
  },
})
export default class ButtonRefresh extends Mixins(Vue, MixinI18n, MixinNotify) {
  /**
   * Disable button.
   */
  disabled = false;

  async handleClick() {
    this.disabled = true;

    // Let the background script handle the refresh process.
    const response = await browser.runtime.sendMessage({ code: 'USER_REFRESH' });

    switch (response.code) {
      case 'USER_REFRESH_SUCCESS':
        await this.$store.dispatch('refreshUserData');

        this.notify('success', this.i18n('S_Success'), this.i18n('N_UserRefreshSuccess'));
        break;

      case 'USER_REFRESH_FAILED':
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
