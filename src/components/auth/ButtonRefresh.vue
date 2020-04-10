<template>
  <!-- eslint-disable max-len -->
  <ButtonBg content="Refresh"
            title="Refresh my data"
            :onClick="handleClick"
            :disabled="disabled" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import ButtonBg from '@/components/ui/buttons/ButtonBg.vue';
import MixinNotify from '@/mixins/Notify';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component({
  components: {
    ButtonBg,
  },
})
export default class ButtonRefresh extends Mixins(Vue, MixinNotify) {
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

        this.notify('success', 'Success', 'Your data have successfully been refreshed.');
        break;

      case 'USER_REFRESH_FAILED':
      default:
        this.notify('error', 'Failed to refresh your data:', response.message);
        break;
    }

    this.disabled = false;
  }
}
</script>

<style lang="scss" scoped>

</style>
