import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/the-real-path/:id/:slug',
    name: 'destination.show',
    component: () => 
      import('../views/DestinationShow.vue'),
    props: route => ({
      ...route.params,
      id: parseInt(route.params.id)}),
    children: [
      {
        path: ':experienceSlug',
        name: 'experience.show',
        component: () => 
          import('../views/ExperienceShow.vue'),
        props: route => ({
          ...route.params,
          id: parseInt(route.params.id)
        })
      }
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
