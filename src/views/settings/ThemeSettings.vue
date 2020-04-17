<template>
  <!-- eslint-disable max-len -->
  <div>
    <h2>{{ i18n('S_Theme') }}</h2>

    <div class="container">
      <div class="col col--justify-start col--items-start">
        <div class="w-full row row--justify-between row--items-start">
          <div class="col col--justify-start col--items-start">
            <div class="fields">
                  <input v-model="theme"
                         :value="themes.DEFAULT"
                         type="radio"
                         :id="`search_type_${themes.DEFAULT}`"
                         @change="$emit('update:value', $event.target.value)">
                  <label :for="`search_type_${themes.DEFAULT}`" class="default" :title="i18n('S_ThemeDefault')">A</label>
                  <input v-model="theme"
                         :value="themes.DARK"
                         type="radio"
                         :id="`search_type_${themes.DARK}`"
                         @change="$emit('update:value', $event.target.value)">
                  <label :for="`search_type_${themes.DARK}`" class="dark" :title="i18n('S_ThemeDark')">A</label>
                  <input v-model="theme"
                         :value="themes.CONTRAST"
                         type="radio"
                         :id="`search_type_${themes.CONTRAST}`"
                         @change="$emit('update:value', $event.target.value)">
                  <label :for="`search_type_${themes.CONTRAST}`" class="contrast" :title="i18n('S_ThemeContrast')">A</label>
            </div>
          </div>
        </div>
      </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as Enum from '@/utils/Enum';
import ButtonClear from '@/components/activity/ButtonClear.vue';
import MixinChangeTheme from '@/mixins/Theme';
import MixinI18n from '@/mixins/I18n';

@Component({
  components: {
    ButtonClear,
  },
})
export default class ThemeSettings extends Mixins(Vue, MixinChangeTheme, MixinI18n) {
  /**
   * Settings from store.
   */
  @State settings!: AniSearch.Settings;

  /* Themes */
  themes = Enum.Theme;

  get theme(): string {
    return this.settings.theme;
  }

  set theme(value: string) {
    const s = JSON.parse(JSON.stringify(this.settings));

    s.theme = value;

    this.$store.dispatch('updateSettings', s);

    this.changeTheme(value);
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 0.25rem;
}

input {
  display: none;
}

label {
  border-radius: 3px;
  border: 2px solid rgb(var(--color-background));
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  height: 30px;
  margin-right: 10px;
  padding-left: 2px;
  padding-top: 5px;
  width: 30px;

  &.default {
    background-color: #EDF1F5;
    color: #2E3C48;
  }

  &.dark {
    background-color: #11161d;
    color: #7A858F;
  }

  &.contrast {
    background-color: #FFFFFF;
    color: #000000;
  }
}
</style>
