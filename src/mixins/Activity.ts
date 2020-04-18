import { Component, Mixins, Vue } from 'vue-property-decorator';
import MixinI18n from '@/mixins/I18n';
import MixinNotify from '@/mixins/Notify';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component
export default class SaveActivity extends Mixins(Vue, MixinI18n, MixinNotify) {
  /**
   * Save activity asynchronously.
   */
  async saveActivity(activity: ALSearch.Activity.Activity): Promise<void> {
    const response = await browser.runtime.sendMessage({
      code: 'SAVE_ACTIVITY',
      data: activity,
    });

    if (response.code !== 'SAVE_ACTIVITY_SUCCESS') {
      this.notify('error', this.i18n('S_Error'), response.message);
      return;
    }

    this.$store.dispatch('refreshActivityFeed');
  }
}
