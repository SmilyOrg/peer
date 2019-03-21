<template>
  <span>
    <v-tooltip right>
      <template #activator="data">
        <span class="time grey--text text--lighten-1" v-on="data.on">{{ ago }}</span>
      </template>
      <span>{{ friendly }}</span>
    </v-tooltip>
  </span>
</template>

<script>
import moment from 'moment';
export default {
  name: 'relative-time',
  props: {
    timestamp: Number,
  },
  computed: {
    time() {
      return moment(this.timestamp);
    },
    friendly() {
      return this.time.format('HH:mm:ss [on] dddd, D. MMM. YYYY');
    },
    now() {
      return this.$store.state.Time.now;
    },
    ago() {
      return this.time.from(this.now);
    },
  },
};
</script>

<style>
.time {
  margin-left: 4px;
  font-size: 0.8em;
}
</style>
