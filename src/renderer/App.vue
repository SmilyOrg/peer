<template>
  <v-app id="app">
    <v-navigation-drawer
     permanent
     app
    >
      <v-list dense class="pt-0">

        <v-list-group
          v-for="server in servers"
          :key="server.id"
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>{{ server.name }}</v-list-tile-title>
            </v-list-tile>
          </template>

            <!-- :to="channel.path" -->
          <v-list-tile
            v-for="channel in server.channels"
            :value="channel.active"
            :key="channel.id"
            :to="'/channel/' + channel.id"
            class="gray--text"
            active-class="blue--text"
          >
            <!-- <v-list-tile-action>
              <v-icon>fa-hashtag</v-icon>
            </v-list-tile-action> -->

            <v-list-tile-content>
              <v-list-tile-title>{{ channel.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

      </v-list>

      <!-- <v-list>
        <v-list-group v-for="item in items" :value="item.active" :key="item.title">
          <v-list-tile slot="item" 
                       :to="item.path == '#' ? '' : item.path" 
                       :exact="item.exact" 
                       class="yellow--text"
                       active-class="red--text">
            <v-list-tile-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title >{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.items.length > 0">
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>         
        </v-list-group>
      </v-list> -->
    </v-navigation-drawer>  
    <!-- <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Topics</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>       -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import moment from 'moment';
import Server from './store/models/Server';
// import Channel from './store/models/Channel';
export default {
  name: 'peer',
  data: () => ({
    drawer: true,
    clipped: false,
    timerId: -1,
  }),
  created() {
    this.$store.dispatch('connect', {
      // id: 'efnet',
      // name: 'EFNet',
      host: 'ip',
      port: 'port',
      // username: 'smily/EFNet',
      id: 'slashnet',
      name: 'SlashNET',
      username: 'smily/SlashNET',
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
  computed: {
    servers() {
      return Server.query().with('channels').get();
      // return this.$store.getters.servers;
    },
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
html {
  overflow-y: auto;
}
</style>
