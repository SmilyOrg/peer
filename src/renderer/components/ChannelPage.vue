<template>
  <div v-if="channel" class="channel">
    <v-toolbar app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>{{ channel.name }}</v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn> -->
    </v-toolbar>
    <messages :messages="channel.messages"></messages>
    <v-text-field
      class="input"
      autofocus
      :prefix="nick"
      :hide-details="true"
      :placeholder="'to ' + channel.name"
      v-model="input"
      @keydown.enter="sendMessage"
    ></v-text-field>
  </div>
</template>

<script>
import Messages from './Messages';
import ChannelModel from '../store/models/Channel';
import ServerModel from '../store/models/Server';
export default {
  name: 'channel-page',
  data: () => ({
    input: '',
  }),
  props: {
    id: String,
  },
  components: {
    Messages,
  },
  computed: {
    nick() {
      const { server } = this;
      return server ? server.nick : '';
    },
    server() {
      return ServerModel.query().whereId(this.channel.server_id).first();
    },
    channel() {
      return ChannelModel.find(this.id);
    },
  },
  methods: {
    sendMessage() {
      console.log('send');
      console.log(this.input);
      this.input = '';
    },
  },
};
</script>

<style scoped>

.channel {
  height: 100%;
}

.input {
  margin: 0px 10px;
}

</style>
