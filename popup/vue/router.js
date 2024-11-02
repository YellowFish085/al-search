const routes = [
  { path: '/',         name: 'home',     component: PageHome },
  { path: '/search',   name: 'search',   component: PageSearch },
  { path: '/settings', name: 'settings', component: PageSettings },
];

const router = VueRouter.createRouter({
  history: VueRouter.createMemoryHistory(),
  routes,
});