<template>
  <div>
    <div class="channels">
      <div class="channel" v-for="channel in channels" :key="channel.name">
        <channel :channel="channel"></channel>
        <!-- <div v-for="msg in channel.messages" :key="msg.index">
          {{ msg.from }}: {{ msg.message }}
        </div> -->
        <!-- <virtual-list :size="40" :remain="8">
          <div v-for="msg of channel.messages" :key="msg.id">
            {{ msg.from }}: {{ msg.message }}
          </div>
        </virtual-list> -->
        
      </div>
    </div>
  </div>
</template>

<script>
import Channel from './Channel';
export default {
  name: 'home',
  components: {
    Channel,
  },
  computed: {
    channels() {
      return this.$store.getters.channels;
    },
  },
  data() {
    return { };
  },
};
</script>

<style scoped>


</style>
