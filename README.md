# AniSearch

## TODO

- Put correct image for search provider in `manifest.json` once we can.

## Project setup
```
npm install
```

### Compiles and watch for development
```
npm run watch
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint --fix
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Notes

### Search provider limitations

AniList uses one search url per type of data (anime, manga...), and doesn't have a global search url.

But, `chrome_settings_overrides.search_provider` configuration key, which is used by this extension to add a custom search engine to the browser, only has a single search url parameter, and we can't dynamically change its value. It's also impossible (?) to add multiple search providers with a single extension.

Due to this limitation on the browser side and to the way AniList search pages are built, the search provider configured by AniSearch can only search on one specific type of data.

For the time being, the search url is set to anime search, as it's _probably_ the one users will use the most.
