<template>
  <!-- eslint-disable max-len -->
  <div id="settings_infos">
    <h2>Informations about data</h2>

    <div class="container">
      <h3>TL;DR</h3>
      <p>We do not collect any of your data in any way, we don't care what you're whatching or reading. Just enjoy this extension :)</p>

      <h3>Activity</h3>
      <p>Search history and visited pages are stored locally, on your browser.</p>
      <p>This means that if you have <b>AniSearch</b> installed in multiple browsers on the same computer, or in multiple browsers on different computers, each <b>AniSearch</b> extension will have its own activity feed.</p>
      <p class="note"><i>Of course, we do not collect any of these data.</i></p>

      <h3>Account</h3>
      <p>When you log in to your <b>AniList</b> account through <b>AniSearch</b>, we will use some of your data in the extension.</p>
      <p>Here is the full list of what we use and how we use it:
        <ul class="account__list">
          <li>Your profile picture and user name
            <ul>
              <li>We use it to show you to which account your are logged in to.</li>
            </ul>
          </li>
          <li>Link to your profile
            <ul>
              <li>We use it to give you a quick access to your profile page.</li>
            </ul>
          </li>
          <li>Title language setting
            <ul>
              <li>We use it to display anime and manga titles in correct language inside <b>AniSearch</b>.</li>
            </ul>
          </li>
          <li>Anime and manga lists content
            <ul>
              <li>We use them to display additional search results when a search is done inside <b>AniSearch</b>.</li>
            </ul>
          </li>
        </ul>
      </p>
      <p class="note"><i>Of course, we do not collect any of these data.</i></p>
    </div>
  </div>
  <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Infos extends Vue {}
</script>

<style lang="scss" scoped>
#settings_infos {
  .account__list {
    list-style-position: inside;
    padding-left: 0;

    ul {
      list-style-position: inside;
      padding-left: 1rem;
    }
  }
}
</style>
