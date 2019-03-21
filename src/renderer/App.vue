<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import moment from 'moment';
export default {
  name: 'peer',
  data: () => ({
    timerId: -1,
  }),
  created() {
    this.$store.dispatch('connect', {
      host: 'ip',
      port: 'port',
      nick: 'Smily',
      // username: 'smily/Foonetic',
      username: 'smily/EFNet',
      password: 'password',
    });

    this.updateNow();
    this.timerId = setInterval(() => {
      this.updateNow();
    }, 1000);
  },
  methods: {
    updateNow() {
      this.$store.state.Time.now = moment();
    },
  },
  destroyed() {
    clearInterval(this.timerId);
    this.timerId = -1;
  },
};
</script>

<style>
  /* CSS */
</style>
