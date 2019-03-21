<template>
  <div class="channel">
    {{ channel.name }}
    <DynamicScroller
        ref="scroller"
        :items="messages"
        :min-item-size="54"
        class="scroller"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
            :item="item"
            :active="active"
            :size-dependencies="[
              item.nick,
              item.text,
            ]"
            :data-index="index"
        >
            <!-- :prev="index <= 0 ? null : messages[index - 1]"
            :next="index >= messages.length - 1 ? null : messages[index + 1]" -->
          <message
            :message="item"
          >
          </message>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script>
import Message from './Message';
export default {
  name: 'channel',
  components: {
    Message,
  },
  props: {
    channel: Object,
  },
  computed: {
    messages() {
      return this.channel.messages;
    },
  },
  methods: {
    scrollToBottom() {
      // this.$refs.scroller.scrollToBottom();
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  watch: {
    'messages.length': function messageLength() {
      this.scrollToBottom();
    },
  },
};
</script>

<style scoped>

.channel {
  padding: 10px;
}

.scroller {
  height: 600px;
}

</style>
