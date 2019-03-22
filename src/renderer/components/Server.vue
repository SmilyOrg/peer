<template>
  <div>
    Hello, welcome to server {{ id }}
  </div>
</template>

<script>
// import Channel from './Channel';
export default {
  name: 'server',
  props: ['id'], 
  components: {
    // Channel,
  },
  computed: {
    // channels() {
    //   return this.$store.getters.channels;
    // },
  },
  data() {
    return { };
  },
};
</script>

<style scoped>


</style>
