import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default,
    },
    // {
    //   path: '/server/:id',
    //   name: 'server',
    //   component: require('@/components/Server').default,
    //   props: true,
    // },
    {
      path: '/channel/:id',
      name: 'channel-page',
      component: require('@/components/ChannelPage').default,
      props: true,
    },
    // {
    //   path: '*',
    //   redirect: '/',
    // },
  ],
});
