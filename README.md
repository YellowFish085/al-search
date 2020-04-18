<p align="center"><img src="./public/logo.svg"></p>
<h3 align="center">AL Search</h3>
<p align="center">Quickly search information on AniList</p>

<hr>

<p align="center">AL Search is an unofficial browser extension for AniList which allows you to quickly search information on AniList.</p>
<p align="center">The extension is available on <a href="https://addons.mozilla.org/en-US/firefox/addon/al-search/" title="See AL Search on Firefox">Firefox</a> and <a href="https://chrome.google.com/webstore/detail/cfgahmhilacehicbomiciimpemjhpalc" title="See AL Search on Chrome">Chrome</a>.</p>

<br>

<p align="center">For more information, see the <a href="https://yellowfish085.github.io/al-search/" title="AL Search">dedicated page</a>.

<hr>

## Development

### Requirements

- NodeJS 10
- NPM 6

### Project setup
```bash
npm ci
```

#### Compiles and watch for development
```bash
# Firefox
npm run watch_firefox

# Chrome
npm run watch_chrome
```

#### Compiles and minifies for production
```bash
# Firefox
npm run build_firefox

# Chrome
npm run build_chrome
```

#### Lints and fixes files
```bash
npm run lint --fix
```

### Notes

#### Search provider limitations

AniList uses one search url per type of data (anime, manga...), and doesn't have a global search url.

But, `chrome_settings_overrides.search_provider` configuration key, which is used by this extension to add a custom search engine to the browser, only has a single search url parameter, and we can't dynamically change its value. It's also impossible (?) to add multiple search providers with a single extension.

Due to this limitation on the browser side and to the way AniList search pages are built, the search provider configured by AL Search can only search on one specific type of data.

For the time being, the search url is set to anime search, as it's _probably_ the one users will use the most.

### Known issues

#### Bottom of the popup "lags" on external monitor on Chrome/MacOS

This bug only appears on MacOS and Chrome.

When opening the popup, if the browser is displayed on an external monitor, the bottom of the popup seems to "lag" when the user click on an input, select text, etc.

This bug is not related to AL Search and is a known bug of chrome (see the [bug report](https://bugs.chromium.org/p/chromium/issues/detail?id=971701&q=component%3APlatform%3EExtensions%20Lag&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified)).
