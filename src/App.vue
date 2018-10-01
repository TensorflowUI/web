<template>
  <div id="app">
    <div class="menu"><Menu/></div>
    <div class="router">
          <router-view></router-view>
    </div>
    <Github/>
  </div>
</template>
<script>
import Menu from '@/components/menu'
import Github from '@/components/github'

export default {
  name: 'app',
  components: {
    Menu, Github
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router {
  margin-left: 60px;
}
</style>
