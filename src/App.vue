<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
/* Font */
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

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
  font-size: 1.6rem;
  height: 600px;
  margin: 0;
  width: 500px;
}
</style>
