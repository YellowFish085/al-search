const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const packageJson = require('./package.json'); // eslint-disable-line

// Background & content scripts to build.
const scripts = {
  background: {
    // 'script': './src/background-scripts/script.ts',
    background: './src/background-scripts/background.ts',
  },
  content: {
    // 'script': './src/content-scripts/script.ts',
    crunchyroll: './src/content-scripts/crunchyroll.ts',
    funimation: './src/content-scripts/funimation.ts',
    wakanim: './src/content-scripts/wakanim.ts',
    animelab: './src/content-scripts/animelab.ts',
    hidive: './src/content-scripts/hidive.ts',
  },
};

// Format scripts in Webpack format.
const entry = {};
Object.keys(scripts.background).forEach((scriptName) => {
  entry[`background/${scriptName}`] = scripts.background[scriptName];
});
Object.keys(scripts.content).forEach((scriptName) => {
  entry[`content/${scriptName}`] = scripts.content[scriptName];
});

// Store background & content script list.
const userScripts = Object.keys(entry);

module.exports = {
  productionSourceMap: false,

  // Ensure we don't hash filenames because we have hard coded paths
  // in index.html.
  filenameHashing: false,

  // Add webpack jobs.
  chainWebpack: (config) => {
    // Disable code splitting.
    config.optimization.delete('splitChunks');

    // Copy manifest.json.
    config.plugin('copy-manifest').use(CopyWebpackPlugin, [
      [
        {
          from: process.env.VUE_APP_BROWSER === 'firefox' ? './src/manifest_firefox.json' : './src/manifest_chrome.json',
          to: 'manifest.json',
          transform: (content) => {
            const m = JSON.parse(content);

            // Fill manifest values with package value.
            m.version = packageJson.version;

            return JSON.stringify(m, null, 2);
          },
        },
      ],
    ]);

    // GraphQL
    config.module.rule('graphql')
      .test(/\.graphql$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();

    // Copy locales.
    config.plugin('copy-locales').use(CopyWebpackPlugin, [
      [
        {
          from: './src/_locales',
          to: '_locales',
        },
      ],
    ]);

    // Add background & content scripts to build list.
    config.merge({ entry });

    config.plugin('html').tap((args) => {
      // Prevent css & js files injections in html.
      args[0].inject = false; // eslint-disable-line

      return args;
    });
  },
};
