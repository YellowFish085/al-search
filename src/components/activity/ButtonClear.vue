<template>
  <!-- eslint-disable max-len -->
  <ButtonBorder content="Clear"
                title="Clear my activity"
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
export default class ButtonClear extends Mixins(Vue, MixinNotify) {
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

        this.notify('success', 'Success', 'Your activity feed have been cleared.');
        break;

      case 'ACTIVITY_FEED_CLEAR_FAILED':
      default:
        this.notify('error', 'Failed to clear your activity feed:', response.message);
        break;
    }

    this.disabled = false;
  }
}
</script>

<style lang="scss" scoped>

</style>
