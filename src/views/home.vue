<template>
  <div class="home page">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter start">
        <img class="tensorflow" alt="Tensorflow UI">
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h2>Create your machine learning model via <a href="https://js.tensorflow.org" target="_blank" alt="Tensorflow">Tensorflow.js</a></h2>
        <h2><strong>Open Source & No coding required!</strong></h2>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field has-addons">
          <p class="control" v-on:click="ga('New ML')">
            <div class="dropdown" v-bind:class="{'is-active': newActive}">
              <div class="dropdown-trigger" v-on:click="newActive = !newActive">
                <div class="button is-medium" aria-haspopup="true" aria-controls="dropdown-menu2">
                  <span class="icon is-small">
                    <v-icon name="plus"></v-icon>
                  </span>
                  <span>New</span>
                </div>
              </div>
              <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                <div class="dropdown-content">
                  <router-link to="/new/imageClassification" class="dropdown-item">
                    <p><strong>Image Classification</strong><br /> Teach a machine to recognize images.</p>
                  </router-link>
                  <hr class="dropdown-divider">
                  <a class="dropdown-item is-disabled" >
                    <p><strong>Text Classification</strong><br /> Under development.</p>
                  </a>
                  <hr class="dropdown-divider">
                  <a href="#/docs" class="dropdown-item">
                    Documantation
                  </a>
                </div>
              </div>
            </div>
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
      newActive: false,
      loadActive: false
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
  padding: 30px 0;
}
.tensorflow {
  max-width: 120px;
}
.has-addons {
  margin: 0 auto;
  width: fit-content;
}
.dropdown {
  text-align: left;
}
.dropdown-menu {
  width: 250px;
}
a.dropdown-item {
  white-space: normal;
}
@media only screen and (min-width: 600px) { 
  .start {
    padding: 50px 0;
  }
  .tensorflow {
    max-width: 200px;
  }
}
</style>
