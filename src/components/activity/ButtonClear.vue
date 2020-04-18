<template>
  <!-- eslint-disable max-len -->
  <ButtonBorder :content="i18n('S_Clear')"
                :title="i18n('S_ClearMyActivity')"
                :onClick="handleClick"
                :disabled="disabled" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import ButtonBorder from '@/components/ui/buttons/ButtonBorder.vue';
import MixinNotify from '@/mixins/Notify';
import MixinI18n from '@/mixins/I18n';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component({
  components: {
    ButtonBorder,
  },
})
export default class ButtonClear extends Mixins(Vue, MixinI18n, MixinNotify) {
  /**
   * Disable button.
   */
  disabled = false;

  async handleClick() {
    this.disabled = true;

    // Let the background script handle the clear process.
    const response = await browser.runtime.sendMessage({ code: 'ACTIVITY_FEED_CLEAR' });

    switch (response.code) {
      case 'ACTIVITY_FEED_CLEAR_SUCCESS':
        await this.$store.dispatch('clearActivityFeed');

        this.notify('success', this.i18n('S_Success'), this.i18n('N_ActivityFeedClearSuccess'));
        break;

      case 'ACTIVITY_FEED_CLEAR_FAILED':
      default:
        this.notify('error', this.i18n('S_Error'), this.i18n('N_ActivityFeedClearFailed', response.message));
        break;
    }

    this.disabled = false;
  }
}
</script>

<style lang="scss" scoped>

</style>
