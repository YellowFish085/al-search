import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDoubleRight,
  faChevronDown,
  faChevronLeft,
  faCogs,
  faExternalLinkAlt,
  faSearch,
  faTh,
  faThLarge,
  faThList,
  faTimes,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faMeh, faFrown, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Notifications from 'vue-notification';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Setup Font Awesome available icons.
library.add(
  // Regular icons.
  faAngleDoubleRight,
  faChevronDown,
  faChevronLeft,
  faCogs,
  faExternalLinkAlt,
  faFrown,
  faMeh,
  faSearch,
  faSmile,
  faTh,
  faThLarge,
  faThList,
  faTimes,
  faUserCircle,
  // Brands icons.
  faGithub as IconDefinition,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

// Add libs.
Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
