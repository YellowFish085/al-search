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
    adn: './src/content-scripts/adn.ts',
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

  // Should prevent webpack from injecting `eval()` and `new Function()` calls to comply with
  // manifest v3 requirements.
  // See https://github.com/webpack/webpack/issues/5627
  configureWebpack: {
    node: {
      // prevent webpack from injecting eval / new Function through global polyfill
      global: false,
    },
    plugins: [
      new webpack.DefinePlugin({
          global: 'window',
      }),
    ],
  },

  // TODO; Il semblerait que le Function("return this") qui reste serait lié a une merde de globalThis.
  // A enqueter.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
  // Il faudrait essayer de déterminer si le probleme avec Function("...") dans le manifest v3 est que le code n'est
  // pas executé ou si le code n'est pas autorisé a étre uploadé, le premier cas étant absolument pas problematique
  // car les instances de Function("...") qui restent semblent etre du code "normal" (cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis#search_for_the_global_across_environments)
  //
  // TODO: Notifications down on Chrome

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
