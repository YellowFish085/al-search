import { Component, Vue } from 'vue-property-decorator';

const browser = require('webextension-polyfill');

@Component
export class SaveActivity extends Vue {
  /**
   * Save activity asynchronously.
   */
  async saveActivity(activity: AniSearch.Activity.Activity): Promise<void> {
    const response = await browser.runtime.sendMessage({
      code: 'SAVE_ACTIVITY',
      data: activity,
    });

    if (response.code !== 'SAVE_ACTIVITY_SUCCESS') {
      this.$notify({
        group: 'anisearch',
        type: 'error',
        duration: -1,
        title: 'Failed to save activity:',
        text: response.message,
      });

      return;
    }

    this.$store.dispatch('refreshActivityFeed');
  }
}
