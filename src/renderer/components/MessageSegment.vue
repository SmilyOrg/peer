<template>
  <span>
    <template v-if="type == 'text'">
      {{ value }}
    </template>
    <template v-if="type == 'url'">
      <a :href="value" target="_blank" @click.prevent="openExternal(value)">{{ value }}</a>
    </template>
  </span>
</template>

<script>
const { shell } = require('electron');
export default {
  name: 'message-segment',
  props: {
    type: String,
    value: null,
  },
  methods: {
    openExternal(url) {
      shell.openExternal(url);
    },
  },
};
</script>

<style scoped>

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

</style>
