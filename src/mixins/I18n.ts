import { Component, Vue } from 'vue-property-decorator';

const browser = require('webextension-polyfill'); // eslint-disable-line

@Component
export default class I18n extends Vue {
  /**
   * Save activity asynchronously.
   */
  i18n(id: string, substitutions: any | any[] = []): string {
    return browser.i18n.getMessage(id, substitutions);
  }
}
