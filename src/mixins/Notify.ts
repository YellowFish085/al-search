import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Notify extends Vue {
  /**
   * Display a notification.
   */
  notify(type: string, title: string, message: string): void {
    this.$notify({
      group: 'al-search',
      type,
      duration: type === 'success' ? 3000 : -1,
      title,
      text: message,
    });
  }
}
