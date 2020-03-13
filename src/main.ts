import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faCogs, faExternalLinkAlt, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Setup Font Awesome available icons.
library.add(faChevronDown, faCogs, faExternalLinkAlt, faSearch, faUserCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
