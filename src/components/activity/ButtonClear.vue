<template>
  <!-- eslint-disable max-len -->
  <ButtonBorder content="Clear"
                title="Clear my activity"
                :onClick="handleClick"
                :disabled="disabled" />
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ButtonBorder from '@/components/ui/buttons/ButtonBorder.vue';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component({
  components: {
    ButtonBorder,
  },
})
export default class ButtonClear extends Vue {
  /**
   * Disable button.
   */
  disabled = false;

  async handleClick() {
    this.disabled = true;

    // Let the background script handle the clear process.
    const response = await browser.runtime.sendMessage({ code: 'ACTIVITY_CLEAR' });

    switch (response.code) {
      case 'ACTIVITY_CLEAR_SUCCESS':
        await this.$store.dispatch('clearActivity');
        this.$notify({
          group: 'anisearch',
          type: 'success',
          duration: 3000,
          title: 'Success',
          text: 'Your activity have been cleared.',
        });
        break;

      case 'ACTIVITY_CLEAR_FAILED':
        this.$notify({
          group: 'anisearch',
          type: 'error',
          duration: -1,
          title: 'Failed to clear your activity:',
          text: response.message,
        });
        break;

      default:
        break;
    }

    this.disabled = false;
  }
}
</script>

<style lang="scss" scoped>

</style>
