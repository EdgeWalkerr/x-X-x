import Vue from 'vue';
import Router from 'vue-router';
import Skills from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Skills',
      component: Skills,
    },
  ],
});
