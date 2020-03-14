<template>
  <ButtonBg content="Refresh"
            title="Refresh my data"
            :onClick="handleClick"
            :disabled="disabled" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ButtonBg from '@/components/ui/buttons/ButtonBg.vue';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component({
  components: {
    ButtonBg,
  },
})
export default class ButtonRefresh extends Vue {
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
        this.$notify({
          group: 'anisearch',
          type: 'success',
          duration: 3000,
          title: 'Success',
          text: 'Your data have successfully been refreshed.',
        });
        break;

      case 'USER_REFRESH_FAILED':
        this.$notify({
          group: 'anisearch',
          type: 'error',
          duration: -1,
          title: 'Failed to refresh your data:',
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
