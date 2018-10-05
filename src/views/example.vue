<template>
  <div class="example page">
    <h1>Example</h1>
  </div>
</template>
<script>
export default {
  name: 'example',
  data () {
    return {
    }
  },
  mounted () {
    console.log('tensor flow example')
    console.log(this.$tf)
    // Pass an array of values to create a vector.
    this.$tf.tensor([1, 2, 3, 4]).print()
  }
}
</script>
<style scoped>

</style>
