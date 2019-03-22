<template>
  <span>
    <v-tooltip bottom>
      <template #activator="data">
        <v-chip v-on="data.on" outline>
          <v-icon small>{{ icon }}</v-icon>
          {{ extra.name }}
          <template v-if="type == 'mode'">
            <i class="fas fa-hashtag"></i> {{ extra.modes }} {{ extra.args }}
          </template>
          <template v-if="type == 'kick'">
            kicked {{ extra.kicked }} {{ extra.modes }} {{ extra.args }}
          </template>
          <template v-if="type == 'quit'">
            <!-- {{ extra.reason }} -->
          </template>
          <template v-if="type == 'join'">
          </template>
          <template v-if="type == 'part'">
            <!-- [{{ extra.reason }}] -->
          </template>
          <template v-if="type == 'nick'">
            <i class="fas fa-arrow-right"></i> {{ extra.newNick }}
          </template>
          <template v-if="type == 'topic'">
            <i class="fas fa-hashtag"></i> {{ extra.topic }}
          </template>
        </v-chip>
      </template>
      <span>{{ event.message }}</span>
    </v-tooltip>
  </span>
</template>

<script>
const userMatcher = /(\S*?)!(\S*?)@(\S*)/;
const extrasMatchers = [
  { type: 'kick', regexp: /(\S*?) kicked (\S+) with reason: ?(.*)/, props: ['user', 'kicked', 'reason'] },
  { type: 'mode', regexp: /(\S*?) set mode: (\S+) ?(.*)/, props: ['user', 'modes', 'args'] },
  { type: 'quit', regexp: /(\S*?) quit with message: ?(.*)/, props: ['user', 'reason'] },
  { type: 'join', regexp: /(\S*?) joined/, props: ['user'] },
  { type: 'part', regexp: /(\S*?) parted: ?(.*)/, props: ['user', 'reason'] },
  { type: 'nick', regexp: /(\S*?) is now known as (.*)/, props: ['user', 'newNick'] },
  { type: 'topic', regexp: /(\S*?) changed the topic to: (.*)/, props: ['user', 'topic'] },
];

export default {
  name: 'message-extra',
  props: {
    event: Object,
  },
  data: () => ({
    expanded: false,
  }),
  computed: {
    extra() {
      let match = null;
      const matcher = extrasMatchers.find((extrasMatcher) => {
        match = this.event.message.match(extrasMatcher.regexp);
        return match;
      });
      const extra = {
        type: match ? matcher.type : 'none',
      };
      if (match) {
        matcher.props.forEach((prop, index) => {
          extra[prop] = match[1 + index];
        });
        if (extra.user) {
          const userMatch = extra.user.match(userMatcher);
          if (userMatch) {
            [, extra.nick, extra.ident, extra.hostname] = userMatch;
            extra.name = extra.nick;
          } else {
            extra.name = extra.user;
          }
        }
      }
      return extra;
    },
    type() {
      return this.extra.type;
    },
    icon() {
      switch (this.extra.type) {
        case 'mode': return 'fas fa-sliders-h';
        case 'kick': return 'fas fa-shoe-prints';
        case 'quit': return 'fas fa-arrow-right quit';
        case 'join': return 'fas fa-arrow-right join';
        case 'part': return 'fas fa-arrow-right part';
        case 'nick': return 'fas fa-tag';
        case 'topic': return 'fas fa-heading';
        default: return '';
      }
    },
  },
};
</script>

<style scoped>

.v-icon {
  /* font-size: 1.7em; */
  /* padding-left: 4px; */
  /* margin: 0px 6px; */
  /* margin-left: 4px; */
  margin-right: 6px;
}

i:not(.v-icon) {
  margin: 4px;
}

.join.fa-arrow-right {
  transform: rotate(45deg);
}

.part.fa-arrow-right, .quit.fa-arrow-right {
  transform: rotate(-45deg);
}

.empty {
  /* margin-right: -6px; */
}

.fa-tag, .fa-shoe-prints, .fa-sign-out-alt, .fa-heading {
}


</style>
