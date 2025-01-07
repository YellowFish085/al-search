class Search {
  static #searchTimer = null;

  static search(delay = store.settings.search.delay) {
    (() => {
      clearTimeout(Search.#searchTimer);

      Search.#searchTimer = setTimeout(async () => {
        if (!store.search.q) {
          return;
        }

        // Ensure scroll is on top of page.
        document.getElementById('app-container').scrollTo(0, 0);

        // Reset search results.
        store.searchResults = null;
        store.searchState   = 'loading';

        // Go to search page.
        router.push({ name: 'search' });

        // Execute search.
        const response = await browser.runtime.sendMessage({ code: 'SEARCH', data: {
          season: store.search.season,
          type:   store.search.type,
          q:      store.search.q,
          year:   store.search.year,
        }});

        // Handle response.
        if (!response.error) {
          store.searchResults = response;
          store.searchState   = 'idle';
        }
        else {
          Notifications.create('search', browser.i18n.getMessage('Error', response.error));
        }

        document.dispatchEvent(new CustomEvent('search-done'));
      }, delay);
    })();
  }
}

// Launch search on event.
document.addEventListener('search', (evt) => {
  Search.search(evt.detail ?? store.settings.search.delay);
});