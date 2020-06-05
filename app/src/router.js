import firebase from 'firebase';
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

// Main views
import Start from './views/Start.vue'
import Hello from './views/Hello.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'

// App pages
import Dashboard from './views/pages/Dashboard.vue'
import Calendar from './views/pages/Calendar.vue'
import AddTask from './views/pages/AddTask.vue'
import EditTask from './views/pages/EditTask.vue'
import Account from './views/pages/Account.vue'

// Components
import FilterTasks from './components/FilterTasks.vue'
import SortTasks from './components/SortTasks.vue'
import Tags from './components/Tags.vue'

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: Start,
      meta: {
        requiresAuth: false
      },
      redirect: '/hello',
      children: [
        {
          path: '/hello',
          component: Hello
        },
        {
          path: '/login',
          component: Login
        },
        {
          path: '/register',
          component: Register
        }
      ]
    },
    {
      path: '/',
      component: Home,
      meta: {
        requiresAuth: true
      },
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          component: Dashboard,
          children: [
            {
              path: 'tags',
              component: Tags,
            },
            {
              path: 'sort',
              component: SortTasks,
            },
            {
              path: 'filter',
              component: FilterTasks,
            },
          ]
        },
        {
          path: '/calendar',
          component: Calendar,
        },
        {
          path: '/add-task',
          component: AddTask,
        },
        {
          path: '/account',
          component: Account,
        },
        {
          path: '/edit-task/:taskKey',
          component: EditTask
        },
      ]
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('hello');
  else if (!requiresAuth && currentUser) next('dashboard');
  else next();
});

export default router;