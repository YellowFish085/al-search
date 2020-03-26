import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faChevronLeft,
  faCogs,
  faExternalLinkAlt,
  faSearch,
  faTimes,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Notifications from 'vue-notification';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Setup Font Awesome available icons.
library.add(
  faChevronDown,
  faChevronLeft,
  faCogs,
  faExternalLinkAlt,
  faSearch,
  faTimes,
  faUserCircle,
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
