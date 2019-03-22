<template>
  <div>
    <message-segment v-for="segment in segments" :key="segment.id" :type="segment.type" :value="segment.value"></message-segment>
    <!-- {{ event.message }} -->
  </div>
</template>

<script>
// import util from 'util';
import MessageSegment from './MessageSegment';
const urlRegex = require('url-regex');
const urlMatcher = urlRegex({ strict: false });
export default {
  name: 'message-event',
  props: {
    event: Object,
  },
  components: {
    MessageSegment,
  },
  computed: {
    segments() {
      const segments = [];
      const msg = this.event.message;
      urlMatcher.lastIndex = 0;
      let match;
      let lastIndex = 0;

      let id = 0;

      // eslint-disable-next-line no-cond-assign
      while ((match = urlMatcher.exec(msg))) {
        if (segments.length === 0) {
          segments.push({ type: 'text', id: id++, value: msg.slice(0, match.index) });
        }
        segments.push({ type: 'url', id: id++, value: msg.slice(match.index, urlMatcher.lastIndex) });
        ({ lastIndex } = urlMatcher);
      }

      if (lastIndex < msg.length) {
        segments.push({ type: 'text', id: id++, value: msg.slice(lastIndex) });
      }
      return segments;
    },
    url() {
      return this.event.message.match(urlMatcher);
    },
  },
};
</script>

<style scoped>
</style>
