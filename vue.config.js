const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const packageJson = require('./package.json'); // eslint-disable-line

// Background & content scripts to build.
const scripts = {
  background: {
    // 'script': './src/background-scripts/script.ts',
  },
  content: {
    // 'script': './src/content-scripts/script.ts',
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
  // Ensure we don't hash filenames because we have hard coded paths
  // in index.html.
  filenameHashing: false,

  // Configure webpack.
  configureWebpack: (config) => {
    // Disable code splitting for background and content scripts
    // because these scripts can't access splitted code.
    const omitUserScripts = ({ name }) => !userScripts.includes(name);
    if (config.optimization
      && config.optimization.splitChunks
      && config.optimization.splitChunks.cacheGroups
    ) {
      if (config.optimization.splitChunks.cacheGroups.vendors) {
        config.optimization.splitChunks.cacheGroups.vendors.chunks = omitUserScripts; // eslint-disable-line
      }
      if (config.optimization.splitChunks.cacheGroups.common) {
        config.optimization.splitChunks.cacheGroups.common.chunks = omitUserScripts; // eslint-disable-line
      }
    }
  },

  // Add webpack jobs.
  chainWebpack: (config) => {
    // Provide packages so that we don't have to import them everywhere.
    config.plugin('provide-webextension-polyfill').use(webpack.ProvidePlugin, [
      {
        browser: 'webextension-polyfill',
      },
    ]);

    // Copy manifest.json.
    config.plugin('copy-manifest').use(CopyWebpackPlugin, [
      [
        {
          from: './src/manifest.json',
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

    // Add background & content scripts to build list.
    config.merge({ entry });

    config.plugin('html').tap((args) => {
      // Prevent css & js files injections in html.
      args[0].inject = false; // eslint-disable-line

      return args;
    });
  },
};
