import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import sourceData from '../data.json';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/the-real-path/:slug',
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
          slug: route.params.slug,
        })
      }
    ],
    beforeEnter: (to, from, next) => {
      const exists = sourceData.destinations.find(
        destination => destination.slug === to.params.slug
      )
      if (exists) {
        next();
      }
      else {
        next({ name: 'notFound' });
      }
    }
  },
  {
    path: '*',
    name: 'notFound',
    component: () =>
      import('../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
