<p align="center"><img src="./public/logo.svg"></p>
<h3 align="center">AniSearch</h3>
<p align="center">Quickly search information on AniList</p>

<hr>

<p align="center">AniSearch is an unofficial browser extension for AniList which allows you to quickly search information on AniList.</p>
<p align="center">The extension is available on <a href="https://addons.mozilla.org/en-US/firefox/addon/anisearch/" title="See AniSearch on Firefox">Firefox</a> and <a href="" title="See AniSearch on Chrom">Chrome</a>.</p>

<br>

<p align="center">For more information, see the <a href="https://yellowfish085.github.io/anisearch/" title="AniSearch">dedicated page</a>.

<hr>

## Development

### Project setup
```bash
npm install
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

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Notes

#### Search provider limitations

AniList uses one search url per type of data (anime, manga...), and doesn't have a global search url.

But, `chrome_settings_overrides.search_provider` configuration key, which is used by this extension to add a custom search engine to the browser, only has a single search url parameter, and we can't dynamically change its value. It's also impossible (?) to add multiple search providers with a single extension.

Due to this limitation on the browser side and to the way AniList search pages are built, the search provider configured by AniSearch can only search on one specific type of data.

For the time being, the search url is set to anime search, as it's _probably_ the one users will use the most.
