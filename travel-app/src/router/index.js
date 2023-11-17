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
    path: '/bookmarks',
    name: 'bookmarks',
    component: () =>
      import('../views/BookmarksPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/invoices',
    name: 'invoices',
    component: () =>
      import('../views/InvoicesPage.vue'),
    meta: {
      requiresAuth: true,
    },

  },
  
  {
    path: '/protected',
    name: 'protected',
    component: () =>
      import('../views/ProtectedPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/login',
    name: 'login',
    component: () =>
      import('../views/LoginPage.vue'),
  },

  {
    path: '/destination/:destinationSlug',
    name: 'destination.show',
    component: () => 
      import('../views/DestinationShow.vue'),
    meta: {
      viewKey: 'destinationSlug',
    },
    children: [
      {
        path: ':experienceSlug',
        name: 'experience.show',
        component: () => 
          import('../views/ExperienceShow.vue'),
        meta: {
          viewKey: 'destinationSlug',
          bookmarkKey: 'destinationSlug',
        },
      }
    ],
    beforeEnter: (to, from, next) => {
      const exists = sourceData.destinations.find(
        destination => destination.slug === to.params.destinationSlug
      );
      if (exists) {
        next();
      }
      else {
        next({ name: 'notFound' });
      }
    }
  },
  {
    path: '/hidden',
    name: 'hidden',
    component: () =>
      import('../views/HiddenPage.vue'),
    
    beforeEnter(to, from, next) {
      if (from.name !== 'protected') {
        next({ name: 'notFound' });
      } else {
        next();
      }
    },
  },
  {
    path: '/404',
    alias: '*',
    name: 'notFound',
    component: () =>
      import('../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log(savedPosition);
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === '#experience') {
          position.offset = { y: 180 };
        }
        if (document.querySelector(to.hash)) {
          position.behavior = 'smooth';
          return position;
        }
        return false;
      }
      
      if (!to.hash) {
        return { 
          x: 0, 
          y: 0,
          behavior: 'smooth',
        };
      }
    }
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('username')) {
    next({
      name: 'login',
      query: { redirect: to.fullPath } 
    });
  } else {
    next();
  }
});

export default router;
