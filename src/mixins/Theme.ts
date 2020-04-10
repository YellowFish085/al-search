import { Component, Vue } from 'vue-property-decorator';
import * as Enum from '@/utils/Enum';

@Component
export class ChangeTheme extends Vue {
  /**
   * Change popup theme.
   */
  changeTheme(theme: string): void {
    document.body.classList.remove(Enum.Theme.DEFAULT, Enum.Theme.DARK, Enum.Theme.CONTRAST);
    document.body.classList.add(theme);
  }
}
