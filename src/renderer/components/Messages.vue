<template>
  <div class="messages">
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
  name: 'messages',
  components: {
    Message,
  },
  props: {
    messages: Array,
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

.messages {
  height: calc(100% - 55px);
}

.message {
  margin: 8px;
}

.scroller {
  height: 100%;
}

</style>
