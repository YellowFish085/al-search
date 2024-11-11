<p align="center"><img src="./img/logo.svg"></p>
<h3 align="center">AL Search</h3>
<p align="center">Quickly search information on AniList</p>

<hr>

<p align="center">AL Search is an unofficial browser extension for AniList which allows you to quickly search information on AniList.</p>
<p align="center">The extension is available on <a href="https://addons.mozilla.org/en-US/firefox/addon/al-search/" title="See AL Search on Firefox">Firefox</a> and <a href="https://chrome.google.com/webstore/detail/cfgahmhilacehicbomiciimpemjhpalc" title="See AL Search on Chrome & Edge Chromium">Chrome & any Chromium based browser</a>.</p>

<br>

<p align="center">For more information, see the <a href="https://yellowfish085.github.io/al-search/" title="AL Search">dedicated page</a>.

<hr>

## Development

To work on the project:
- Copy the `manifest_chrome.json` or `manifest_firefox.json` file to `manifest.json` (depending on the browser you're on).
- Copy the `env.example` file to `env.js` and fill the `anilist.client_id` property with your client ID.
- Load the extension in your browser.

> Note: This project doesn't need any build process.

### Third party libraries included

To make it easier to comply with Manifest V3 and also prevent any review issues, the few third party libraries used by this project are included:

- Vue `3.5.12` (copied from official NPM repository)
- Vue Router `4.4.5` (copied from official NPM repository)
- Webextension-polyfill `0.12.0` (copied from official NPM repository)
- Fontawesome `5.15.4` ([Direct download link](https://use.fontawesome.com/releases/v5.15.4/fontawesome-free-5.15.4-web.zip?_gl=1*1otdaau*_ga*MjI3MjM0MTUuMTcxMDg1ODM5OA..*_ga_BPMS41FJD2*MTczMDE5OTY0OS4xNC4xLjE3MzAxOTk4OTYuMzEuMC4w))
- Roboto font ([from fonts.google.com](https://fonts.google.com/share?selection.family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900))
