const browser = require('webextension-polyfill'); // eslint-disable-line

const messages = {
  error: (title: string, message: string) => `${title}: ${message}`,
  auth: {
    success: (name: string) => `Your are now logged in to AniList as ${name}!`,
  },
};

/**
 * Send browser notification.
 */
function create(id: string, message: string) {
  browser.notifications.create(id, {
    type: 'basic',
    title: 'AniSearch',
    iconUrl: browser.extension.getURL('img/logo.png'),
    message,
  });
}

export default {
  messages,
  create,
};
