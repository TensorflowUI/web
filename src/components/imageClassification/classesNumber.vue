<template>
  <div class="ClassesNumber page">
    <div class="columns">
      <div class="column is-narrow content">
        <h2 class="title is-2">Classes Number?</h2>
        <h5 class="subtitle is-5">{{ subTitle }}</h5>
        <div class="field">
          <div class="control">
            <input v-model="number" class="input is-medium" type="number" placeholder="Classes number">
          </div>
        </div>
        <a class="button is-medium" v-on:click="setNumber">Create</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ClassesNumber',
  props: {
    subTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      number: 2
    }
  },
  methods: {
    setNumber: function () {
      var arr = Array.apply(null, Array(Number(this.number))).map(Number.prototype.valueOf, 0)
      this.$emit('input', arr)
    }
  }
}
</script>
<style scoped>
.content {
  max-width: 350px;
  text-align: center;
  margin: 75px auto; 
}
</style>
