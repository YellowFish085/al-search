import { Component, Mixins, Vue } from 'vue-property-decorator';
import MixinNotify from '@/mixins/Notify';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component
export default class SaveActivity extends Mixins(Vue, MixinNotify) {
  /**
   * Save activity asynchronously.
   */
  async saveActivity(activity: AniListSearch.Activity.Activity): Promise<void> {
    const response = await browser.runtime.sendMessage({
      code: 'SAVE_ACTIVITY',
      data: activity,
    });

    if (response.code !== 'SAVE_ACTIVITY_SUCCESS') {
      this.notify('error', 'Failed to save activity:', response.message);
      return;
    }

    this.$store.dispatch('refreshActivityFeed');
  }
}
