<template>
  <!-- eslint-disable max-len -->
  <ButtonBorder content="Logout"
                title="Logout"
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
export default class ButtonLogout extends Vue {
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
        this.$notify({
          group: 'anisearch',
          type: 'success',
          duration: 3000,
          title: 'Logged out',
          text: 'Don\'t forget to remove the access token in your AniList > Apps setting page.',
        });
        break;

      case 'USER_LOGOUT_FAILED':
        this.$notify({
          group: 'anisearch',
          type: 'error',
          duration: -1,
          title: 'Logout failure:',
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
