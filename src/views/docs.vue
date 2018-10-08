<template>
  <div class="docs page">
    <h1>Documantation</h1>
    <div v-html="computedMarked"></div>
  </div>
</template>
<script>
import service from '@/service'
export default {
  name: 'docs',
  data () {
    return {
      bodyText: ''
    }
  },
  mounted () {
    var self = this
    service.readmePage(this).then(function (data) {
      self.bodyText = data.bodyText
    })
  },
  computed: {
    computedMarked: function () {
      return this.$marked(this.bodyText, { sanitize: true })
    }
  }
}
</script>
<style scoped>
h1 {
  font-size: 3em;
}
h2 {
  font-size: 2em !important;
}
</style>
