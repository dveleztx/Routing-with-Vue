import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/pages/TeamsList.vue';
import UsersList from './components/pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/pages/NotFound.vue';
import TeamsFooter from './components/pages/TeamsFooter.vue';
import UsersFooter from './components/pages/UsersFooter.vue';

// Create router object
const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/teams' },
      {
        name: 'teams',
        path: '/teams',
        meta: { needsAuth: true },
        components: {
          default: TeamsList,
          footer: TeamsFooter
        },
        children: [
          { name: 'team-members', path: ':teamId', component: TeamMembers } // Dynamic route with route parameters
        ]
      }, // our-domain.com/teams => TeamsList
      {
        path: '/users',
        components: {
          default: UsersList,
          footer: UsersFooter
        }, // our-domain.com/users => UsersList
        beforeEnter(to, from, next) {
          console.log("users beforeEnter");
          console.log(to, from);
          next();
        } // route level navigation guard
      },
      //{ path: '/teams/new' } // This needs to be above teamId parameter, or it will be considered a teamId, order matters
      { path: '/:notFound(.*)', component: NotFound }
    ],
    scrollBehavior(_, _2, savedPosition) {
      //console.log(to, from, savedPosition);
      if (savedPosition) {
        return savedPosition;
      }
      return { left: 0, top: 0 };
    }
  });
  
  // Built-in method for navigation guards like canceling or deny navigation
  router.beforeEach(function(to, from, next) {
    console.log("Global beforeEach");
    console.log(to, from);
    if (to.meta.needsAuth) {
      console.log("Needs auth!");
      next();
    } else {
      next();
    }
    //next(false); //cancel all navigation, but this could be used to prevent user from authorized pages
    // if (to.name === 'team-members') {
    //   next();
    // } else {
    //   next({ name: 'team-members', params: { teamId: 't2' }});
    // }
    next();
  });
  
  router.afterEach(function(to, from) {
    // Sending analytics data, log when user changes pages, etc.
    console.log("Global afterEach");
    console.log(to, from);
  });

  export default router;