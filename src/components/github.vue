<template>
  <div class="github-tag">
    <a href="https://github.com/tensorflowUI" rel="noreferrer" target="_blank" alt="Github TensorflowUI" v-on:click="ga">
      <img class="github" alt="Github">
    </a>
  </div>
</template>

<script>
export default {
  name: 'github',
  data () {
    return {
    }
  },
  methods: {
    ga: function (argument) {
      this.$ga.event('github', 'click')
    }
  }
}
</script>
<style scoped>
.github-tag {
  position: fixed;
  left: 15px;
  bottom: 10px;
  z-index: 1001;
}
.github {
  max-width: 30px;
}
</style>
