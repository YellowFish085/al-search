<template>
  <!-- eslint-disable max-len -->
  <div id="app">
    <Notifications />
    <transition appear name="init">
      <ErrorComponent v-if="critError" :error="critError" key="error"/>
      <div id="content" v-else-if="initialized" key="content">
        <Header />
        <transition appear name="pages" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </transition>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Vue,
  Watch,
} from 'vue-property-decorator';
import { State } from 'vuex-class';
import ErrorComponent from '@/components/ErrorComponent.vue';
import Header from '@/components/layout/Header.vue';
import MixinChangeTheme from '@/mixins/Theme';
import Notifications from '@/components/ui/Notifications.vue';

@Component({
  components: {
    ErrorComponent,
    Header,
    Notifications,
  },
})
export default class App extends Mixins(Vue, MixinChangeTheme) {
  @State('settings') settings!: ALSearch.Settings;

  /**
   * Store is initialized.
   */
  @State('initialized') initialized!: boolean;

  /**
   * Store has critical error.
   */
  @State('critError') critError?: Error;

  created(): void {
    // Initialize store state from local storage.
    this.$store.dispatch('init');
  }

  @Watch('settings')
  onSettingsChanged(
    newValue: ALSearch.Settings | null,
    oldValue: ALSearch.Settings | null,
  ) {
    if (!newValue) return;

    if (!oldValue || oldValue.theme !== newValue.theme) this.changeTheme(newValue.theme);
  }
}
</script>

<style lang="scss">
/* Font */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i&display=swap');

/* Theme */
:root {
  --color-header: 43,45,66;
  --color-header-text: 188,190,220;
  --color-header-text-hover: 211,213,243;
  --color-background: 237,241,245;
  --color-foreground: 250,250,250;
  --color-foreground-grey: 245,246,246;
  --color-foreground-grey-dark: 234,236,237;
  --color-foreground-blue: 246,248,251;
  --color-foreground-blue-dark: 241,243,247;
  --color-background-blue-dark: 31,35,45;
  --color-overlay: 31,38,49;
  --color-shadow: 49,54,68;
  --color-shadow-dark: 6,13,34;
  --color-shadow-blue: 103,132,187;
  --color-text: 92,114,138;
  --color-text-light: 122,133,143;
  --color-text-lighter: 146,153,161;
  --color-text-bright: 237,241,245;
  --color-blue: 61,180,242;
  --color-blue-dim: 141,178,219;
  --color-white: 255,255,255;
  --color-black: 0,0,0;
  --color-red: 232,93,117;
  --color-peach: 250,122,122;
  --color-orange: 247,154,99;
  --color-yellow: 247,191,99;
  --color-green: 123,213,85;
  --color-background-100: 251,251,251;
  --color-background-200: 237,241,245;
  --color-background-300: 221,230,238;
  --color-background-400: 201,215,227;
  --color-background-500: 173,192,210;
  --color-background-600: 139,160,178;
  --color-background-700: 116,136,153;
  --color-background-800: 100,115,128;
  --color-background-900: 81,97,112;
  --color-background-1000: 64,78,92;
  --color-background-1100: 38,52,63;
  --color-background-1200: 27,30,31;
  --color-gray-100: 251,251,251;
  --color-gray-200: 237,241,245;
  --color-gray-300: 221,230,238;
  --color-gray-400: 201,215,227;
  --color-gray-500: 173,192,210;
  --color-gray-600: 139,160,178;
  --color-gray-700: 116,136,153;
  --color-gray-800: 100,115,128;
  --color-gray-900: 81,97,112;
  --color-gray-1000: 64,78,92;
  --color-gray-1100: 38,52,63;
  --color-gray-1200: 27,30,31;
  --color-blue-100: 247,250,252;
  --color-blue-200: 236,246,254;
  --color-blue-300: 201,232,255;
  --color-blue-400: 143,215,255;
  --color-blue-500: 111,200,255;
  --color-blue-600: 61,180,242;
  --color-blue-700: 8,143,214;
  --color-blue-800: 12,101,166;
  --color-blue-900: 11,70,113;
  --color-blue-1000: 16,61,85;
  --color-green-100: 245,249,243;
  --color-green-200: 226,246,217;
  --color-green-300: 160,241,126;
  --color-green-400: 119,220,76;
  --color-green-500: 83,175,45;
  --color-green-600: 56,126,26;
  --color-green-700: 46,90,27;
  --color-green-800: 41,66,31;
  --color-red-100: 255,244,246;
  --color-red-200: 254,212,220;
  --color-red-300: 255,140,160;
  --color-red-400: 236,41,75;
  --color-red-500: 213,0,37;
  --color-red-600: 165,1,29;
  --color-red-700: 117,0,20;
}

.theme-dark {
  --color-header: 21,34,50;
  --color-header-text: 160,170,197;
  --color-background: 11,22,34;
  --color-foreground: 21,31,46;
  --color-foreground-grey: 15,22,31;
  --color-foreground-grey-dark: 6,12,19;
  --color-foreground-blue: 15,22,31;
  --color-foreground-blue-dark: 6,12,19;
  --color-text: 159,173,189;
  --color-text-light: 114,138,161;
  --color-text-lighter: 133,150,165;
  --color-shadow-blue: 0,5,15;
  --color-background-1200: 251,251,251;
  --color-background-1100: 240,243,246;
  --color-background-1000: 221,230,238;
  --color-background-900: 201,215,227;
  --color-background-800: 173,192,210;
  --color-background-700: 139,160,178;
  --color-background-600: 116,136,153;
  --color-background-500: 100,115,128;
  --color-background-400: 81,97,112;
  --color-background-300: 30,42,56;
  --color-background-100: 21,31,46;
  --color-background-200: 11,22,34;
  --color-gray-1200: 251,251,251;
  --color-gray-1100: 240,243,246;
  --color-gray-1000: 221,230,238;
  --color-gray-900: 201,215,227;
  --color-gray-800: 173,192,210;
  --color-gray-700: 139,160,178;
  --color-gray-600: 116,136,153;
  --color-gray-500: 100,115,128;
  --color-gray-400: 81,97,112;
  --color-gray-300: 30,42,56;
  --color-gray-100: 21,31,46;
  --color-gray-200: 11,22,34;
}

.theme-contrast {
  --color-background: 229,235,241;
  --color-foreground: 251,251,251;
  --color-foreground-grey: 229,233,245;
  --color-foreground-grey-dark: 221,225,239;
  --color-foreground-blue: 229,233,245;
  --color-foreground-blue-dark: 221,225,239;
  --color-text: 38,52,63;
  --color-text-light: 64,78,92;
  --color-text-lighter: 81,97,112;
  --color-shadow: 37,41,51;
  --color-blue: 18,172,253;
  --color-blue-dim: 85,144,208;
  --color-background-100: 251,251,251;
  --color-background-200: 229,235,241;
  --color-background-300: 173,192,210;
  --color-background-400: 139,160,178;
  --color-background-500: 116,136,153;
  --color-background-600: 100,115,128;
  --color-background-700: 64,78,92;
  --color-background-800: 64,78,92;
  --color-background-900: 38,52,63;
  --color-background-1000: 27,30,31;
  --color-background-1100: 27,30,31;
  --color-background-1200: 27,30,31;
  --color-gray-100: 251,251,251;
  --color-gray-200: 229,235,241;
  --color-gray-300: 173,192,210;
  --color-gray-400: 139,160,178;
  --color-gray-500: 116,136,153;
  --color-gray-600: 100,115,128;
  --color-gray-700: 64,78,92;
  --color-gray-800: 64,78,92;
  --color-gray-900: 38,52,63;
  --color-gray-1000: 27,30,31;
  --color-gray-1100: 27,30,31;
  --color-gray-1200: 27,30,31;
}

/* Main */
* {
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  &:focus {
    outline: none;
  }
}

html {
  font-size: 62.5%;
  line-height: 1.15;
}

body {
  background: rgb(var(--color-header));
  color: rgb(var(--color-text));
  font-family: 'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 1.6rem;
  margin: 0;
  overflow: hidden;
}

.wrapper {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  position: relative;
}

.container {
  background-color: rgb(var(--color-foreground));
  border-radius: 3px;
  margin-bottom: 20px;
  padding: 18px;
  width: 100%;

  p {
    color: rgb(var(--color-text-lighter));

    &:last-child {
      margin-bottom: 0;
    }

    & + p {
      margin-top: 0;
    }
  }
}

.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}

.col,
.row {
  display: flex;

  &--justify-between {
    justify-content: space-between;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-start {
    justify-content: flex-start;
  }

  &--items-center {
    align-items: center;
  }

  &--items-start {
    align-items: flex-start;
  }
}

.col {
  flex-direction: column;
}

.row {
  flex-direction: row;
}

h1, h2, h3 {
  margin: 0;
}

h1 {
  color: rgb(var(--color-gray-800));
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-bottom: 20px;
  text-transform: uppercase;
}

h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 15px;
}

h3 {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 10px;
}

h4 {
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 5px;
}

p {
  font-size: 1.3rem;
  line-height: 1.3;

  &.note {
    opacity: 0.8;
  }
}

b {
  color: rgb(var(--color-blue));
  font-style: italic;
}

a {
  color: rgb(var(--color-blue));
}

.icon {
  margin: 0 0.2rem;

  &.blue {
    color: rgb(var(--color-blue));
  }
}

#app {
  background: rgb(var(--color-background));
  height: 500px;
  margin-top: 85px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 500px;

  #content {
    height: 100%;

    > section {
      padding-bottom: 25px;
      padding-top: 25px;
      width: 100%;

      &.vw {
        width: 100vw;
      }
    }
  }
}

/* Search results components */
@keyframes loading-pulse-data {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(50%);
  }
}

.search-results {
  .results-wrapper {
    position: relative;
  }

  .results-placeholder {
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  .grid {
    display: inline-grid;
    row-gap: 30px;
    padding-right: 12.5px;

    .card {
      a {
        color: inherit;
        outline: 0;
        text-decoration: none;
        transition: 0.15s;
      }
    }
  }
}

/* Components transitions */
.init-enter-active, .init-leave-active {
  transition: opacity 0.2s;
}
.init-enter, .init-leave-to {
  opacity: 0;
}

.pages-enter-active, .pages-leave-active {
  transition: opacity 0.025s;
}
.pages-enter, .pages-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.translate-small-enter-active, .translate-small-leave-active {
  transition: all 0.2s;
}
.translate-small-enter, .translate-small-leave-active {
  opacity: 0;
}
.translate-small-enter {
  transform: translateX(10px);
}
.translate-small-leave-active {
  transform: translateX(-10px);
}

.translate-enter-active, .translate-leave-active {
  transition: all 0.2s;
}
.translate-enter, .translate-leave-active {
  opacity: 0;
}
.translate-enter {
  transform: translateX(30px);
}
.translate-leave-active {
  transform: translateX(-30px);
}
</style>
