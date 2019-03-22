<template>
  <div class="message">
    <template v-if="extras">
      <message-extra
        v-for="(event, index) in message.events"
        :key="index"
        :event="event"
      >
      </message-extra>
      <relative-time :timestamp="first.time"></relative-time>
    </template>
    <template v-else>
      <div class="header">
        <strong class="nick carto-vivid" :class="[nickClass]">{{ nick }}</strong>
        <relative-time :timestamp="first.time"></relative-time>
      </div>
      <message-event v-for="(event, index) in message.events" :key="index" :event="event"></message-event>
    </template>
    <!-- <div class="text">{{ text }}</div> -->
  </div>
</template>

<script>
import XXH from 'xxhashjs';
import MessageExtra from './MessageExtra';
import MessageEvent from './MessageEvent';
import RelativeTime from './RelativeTime';

const maxColors = 12;

// const timestampMatcher = /\[(\d\d):(\d\d):(\d\d)\] (.*)/;
export default {
  name: 'message',
  props: {
    message: Object,
    // prev: Object,
    // next: Object,
  },
  components: {
    MessageExtra,
    MessageEvent,
    RelativeTime,
  },
  computed: {
    testExtras() {
      return [
        { message: 'Smily!user@host set mode: +snt {3}', target: '#peer-dev-testing' },
        { message: 'Smily!user@host kicked Ass with reason: I don\'t have bubble gum' },
        { message: 'Smily!user@host quit with message: [Disconnected by Peer]' },
        { message: 'Smily!user@host joined' },
        { message: 'Smily!user@host parted: This channel sucks' },
        { message: 'Smily!user@host is now known as Batman' },
        { message: 'Smily!user@host changed the topic to: I\'m Batman!' },
      ];
    },
    nickClass() {
      const hash = XXH.h32(this.message.ident, 0);
      const num = 1 + (hash % maxColors);
      return `color-${num}`;
      // const buffer = crypto.createHash('md5').update(this.message.ident).read(16);
      // return buffer;
    },
    first() {
      return this.message.events[0];
    },
    nick() {
      return this.first.nick;
    },
    extras() {
      const { ident, nick } = this.first;
      return ident === 'buffextras' && nick === '*buffextras';
    },
    // continued() {
    //   if (!this.prev) return false;
    //   return this.prev.ident === this.message.ident;
    // },
    // bottom() {
    //   if (!this.next) return true;
    //   return this.next.ident !== this.message.ident;
    // },
    // text() {
    //   return this.message.message;
    // },
    // timestamp() {
    //   const match = this.text.match(timestampMatcher);
    //   if (!match || match.length < 5) return '';
    //   return `${match[1]}:${match[2]}:${match[3]}`;
    // },
    // content() {
    //   const match = this.text.match(timestampMatcher);
    //   if (!match || match.length < 5) return this.text;
    //   return match[4];
    // },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Rubik:400,700&subset=cyrillic,hebrew,latin-ext');
@import url('carto-colors.css');

.message {
  font-family: 'Rubik', sans-serif;
  padding-bottom: 10px;
}

</style>
