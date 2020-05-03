import {
  Component,
  Mixins,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as Enum from '@/utils/Enum';
import Color from '@/utils/Color';
import MixinI18n from '@/mixins/I18n';
import MixinSaveActivity from '@/mixins/Activity';

@Component
export default class CardMedia extends Mixins(Vue, MixinI18n, MixinSaveActivity) {
  @State('settings') settings!: ALSearch.Settings;

  @Prop() readonly data?: ALSearch.AniList.Media;

  /**
   * Get media colors overlay.
   */
  get mediaColors(): object {
    return Color.getMediaCardColors(this.data!.coverImage.color);
  }

  /**
   * Return media studio if available.
   */
  get studio(): any {
    return this.data!.studios && this.data!.studios.edges[0]
      ? this.data!.studios.edges[0].node
      : null;
  }

  /**
   * Is the media an anime and currently airing?
   */
  get isAiring(): boolean {
    return this.data!.type === Enum.SearchType.ANIME
      && this.data!.status === Enum.Status.RELEASING
      && this.data!.nextAiringEpisode !== null;
  }

  /**
   * Is the media a manga and currently published?
   */
  get isPublishing(): boolean {
    return this.data!.type === Enum.SearchType.MANGA
      && this.data!.status === Enum.Status.RELEASING
      && this.data!.startDate.year !== null;
  }

  /**
   * Return countdown pre content.
   */
  get nextEpisodeIn(): string {
    return this.i18n('S_NextAiringEpisodeIn', `${this.data!.nextAiringEpisode!.episode}`);
  }

  /**
   * Return countdown content.
   */
  get countdown(): string {
    const seconds = this.data!.nextAiringEpisode!.timeUntilAiring;

    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let str = '';
    if (minutes) str = ` ${minutes}m`;
    if (hours) str = ` ${hours}h${str}`;
    if (days) str = `${days}d${str}`;

    return str.trim();
  }

  /**
   * Return ongoing since content.
   */
  get ongoingSince(): string {
    return this.data!.type === Enum.SearchType.ANIME
      ? this.i18n('S_ReleasingSince', `${this.data!.startDate.year}`)
      : this.i18n('S_PublishingSince', `${this.data!.startDate.year}`);
  }

  /**
   * Return date or status content.
   */
  get datesOrStatus(): string {
    let str = '';

    // Cases for anime.
    if (this.data!.type === Enum.SearchType.ANIME) {
      // If season available, display "Season Year" format.
      if (this.data!.season) str = `${this.i18n(`ENUM_${this.data!.season}`)} ${this.data!.startDate.year}`;
      // If start date available.
      else if (this.data!.startDate.year) str = `${this.data!.startDate.year}`;
    }
    // Cases for manga.
    else if (this.data!.type === Enum.SearchType.MANGA) {
      // Try to display a "Start date - End date" format.
      if (this.data!.startDate.year) str += this.data!.startDate.year;
      if (this.data!.endDate.year && this.data!.startDate.year !== this.data!.endDate.year) {
        if (str) str += ' - ';

        str += this.data!.endDate.year;
      }
    }

    // Fallback to simply displaying status if nothing worked.
    if (!str) str = this.i18n(`ENUM_${this.data!.status}`);

    return str;
  }

  /**
   * Return duration content.
   */
  get duration(): string {
    let str = '';

    const episodesFormats = [
      Enum.Format.ONA,
      Enum.Format.OVA,
      Enum.Format.SPECIAL,
      Enum.Format.TV,
      Enum.Format.TV_SHORT,
    ];

    // Cases for anime.
    if (this.data!.type === Enum.SearchType.ANIME) {
      // Display episode count for valid formats.
      if (this.data!.format && episodesFormats.includes(this.data!.format) && this.data!.episodes) {
        str = `${this.data!.episodes} ${this.i18n('S_Episodes')}`;
      }
      // Else display duration time.
      else str = this.durationTime();
    }

    // Cases for manga.
    if (this.data!.type === Enum.SearchType.MANGA) {
      // If chapter count.
      if (this.data!.chapters) str = this.chapterCount();
    }

    return str;
  }

  /**
   * Get genre url.
   */
  genreUrl(genre: string): string {
    return this.data!.type === Enum.SearchType.ANIME
      ? `${process.env.VUE_APP_ANILIST_ANIME_URL}/${genre}`
      : `${process.env.VUE_APP_ANILIST_MANGA_URL}/${genre}`;
  }

  /**
   * Return formatted duration time.
   */
  durationTime(): string {
    const duration = this.data!.duration!;

    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);

    let str = '';
    if (minutes) str = ` ${minutes}m`;
    if (hours) str = `${hours}h${str}`;

    return str.trim();
  }

  /**
   * Return chapters count.
   */
  chapterCount(): string {
    return `${this.data!.chapters} ${this.i18n('S_Chapters')}`;
  }

  handleClick(e: Event): void {
    e.stopPropagation();
    e.preventDefault();

    window.open(this.data!.siteUrl);

    if (this.settings.activity.visitedPages) {
      const activity: ALSearch.Activity.Activity = {
        type: Enum.ActivityType.VISITED_PAGE,
        label: this.data!.title.userPreferred,
        value: this.data!.siteUrl,
        params: {
          type: this.data!.type as Enum.SearchType,
        },
      };

      this.saveActivity(activity);
    }
  }

  handleStudioClick(e: Event): void {
    window.open(this.data!.studios!.edges[0].node.siteUrl);
  }
}
