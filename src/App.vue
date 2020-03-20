<template>
  <!-- eslint-disable max-len -->
  <div id="app">
    <Notifications />
    <ErrorComponent v-if="critError" :error="critError" />
    <div v-else-if="initialized">
      <Header />
      <router-view/>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import ErrorComponent from '@/components/ErrorComponent.vue';
import Header from '@/components/layout/Header.vue';
import Notifications from '@/components/ui/Notifications.vue';

@Component({
  components: {
    ErrorComponent,
    Header,
    Notifications,
  },
})
export default class App extends Vue {
  /**
   * Store is initialized.
   */
  @State initialized!: boolean;

  /**
   * Store has critical error.
   */
  @State critError?: Error;

  created(): void {
    // Initialize store state from local storage.
    this.$store.dispatch('init');
  }
}
</script>

<style lang="scss">
/* Font */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i&display=swap');

/* Theme */
:root {
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
}

.theme-dark {
  --color-background: 39,44,56;
  --color-foreground: 31,35,45;
  --color-foreground-grey: 25,29,38;
  --color-foreground-grey-dark: 16,20,25;
  --color-foreground-blue: 25,29,38;
  --color-foreground-blue-dark: 19,23,29;
  --color-text: 159,173,189;
  --color-text-light: 129,140,153;
  --color-text-lighter: 133,150,165;
  --color-shadow-blue: 0,5,15;
}

.theme-contrast {
  --color-background: 214,224,239;
  --color-foreground: 245,246,249;
  --color-foreground-grey: 229,233,245;
  --color-foreground-grey-dark: 221,225,239;
  --color-foreground-blue: 229,233,245;
  --color-foreground-blue-dark: 221,225,239;
  --color-text: 0,0,0;
  --color-text-light: 94,101,111;
  --color-text-lighter: 94,101,111;
  --color-shadow: 37,41,51;
  --color-blue: 18,172,253;
  --color-blue-dim: 85,144,208;
}

/* Main */
* {
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

html {
  font-size: 16px;
  line-height: 1.15rem;
}

body {
  background: rgb(var(--color-background));
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
  font-size: 1rem;
  margin: 0;
  overflow: hidden;
}

.wrapper {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.container {
  background-color: rgb(var(--color-foreground));
  border-radius: 3px;
  margin-bottom: 15px;
  padding: 15px;
  width: 100%;
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

h1 {
  font-size: 1.2rem;
  font-weight: 400;
}

h2 {
  font-size: 1rem;
  font-weight: 500;
}

h3 {
  font-size: 0.9rem;
  font-weight: 400;
}

p {
  font-size: 0.8rem;

  &.note {
    font-size: 0.7rem;
  }
}

b {
  color: rgb(var(--color-blue));
  font-style: italic;
}

a {
  color: rgb(var(--color-blue));
}

.container {
  h1, h2, h3, h4, h5, h6, p {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  p {
    & + p {
      margin-top: 0;
    }
  }
}

.icon {
  margin: 0 0.2rem;

  &.blue {
    color: rgb(var(--color-blue));
  }
}

#app {
  height: 550px;
  margin-top: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 500px;

  > section {
    width: 100%;
  }
}
</style>
