<template>
  <div class="home page">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter start">
        <img class="tensorflow" alt="Tensorflow UI">
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h2><a href="https://js.tensorflow.org" target="_blank" alt="Tensorflow">Tensorflow.js</a> Machine Learning Model</h2>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field has-addons">
          <p class="control" v-on:click="ga('New ML')">
            <a class="button is-medium">
              <span class="icon is-small">
                <v-icon name="plus"></v-icon>
              </span>
              <span>New</span>
            </a>
          </p>
          <p class="control" v-on:click="ga('Load ML')">
            <a class="button is-medium" disabled>
              <span>or</span>
            </a>
          </p>
          <p class="control">
            <a class="button is-medium">
              <span class="icon is-small">
                <v-icon name="upload"></v-icon>
              </span>
              <span>Load</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods: {
    ga: function (category) {
      this.$ga.event(category, 'click')
    }
  }
}
</script>
<style scoped>
.home {
  text-align: center;
}
.start {
  padding: 50px 0;
}
.tensorflow {
  max-width: 200px;
}
.has-addons {
  margin: 0 auto;
  width: fit-content;
}
</style>
