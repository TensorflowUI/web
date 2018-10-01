<template>
  <div class="menu">
    <template v-for="item in menu">
      <div class="columns menuItem" v-bind:class="{'selected': isSelected(item.url)}" v-on:click="route(item.url)">
        <div class="column icon"><v-icon :name="item.icon"/></div>
        <div class="column text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      selected: '/',
      menu: [
        {icon: 'home', title: 'Home', url: '/'},
        {icon: 'layer-group', title: 'Api', url: '/api'},
        {icon: 'code', title: 'Example', url: '/example'},
        {icon: 'book', title: 'Docs', url: '/docs'}
      ]
    }
  },
  methods: {
    route: function (url) {
      this.$router.push(url)
    },
    isSelected: function (path) {
      return this.$route.path === path
    }
  }
}
</script>
<style scoped>
.menu {
  height: 100%;
  width: 60px;
  z-index: 1000;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid #ccc;
  background-color: var(--bg-color2);
  -webkit-transition: width 0.3s; /* Safari */
  transition: width 0.3s;
}
.menuItem {
  cursor: pointer;
  margin: 2px 0 !important;
  color: #464646;
  font-size: 14px;
  border-radius: 2px;
  white-space:nowrap;
  transition: unset;
  height: 45px;
}
.menuItem.selected {
  color: #f5f5f5;
  background-color: var(--color-dark-blue);
}
.icon {
  max-width: 30px;
  line-height: 28px;
  height: 30px;
}
.text {
  display: none;
  opacity: 0;
  transition: visibility 0s 0s, opacity 0s linear;
}
@media only screen and (min-width: 600px) {
  .menu:hover {
    width: 230px;
    -webkit-box-shadow: 0 8px 16px 0 rgba(20, 94, 151, 0.2);
    -moz-box-shadow: 0 8px 16px 0 rgba(20, 94, 151, 0.2);
    box-shadow: 0 8px 16px 0 rgba(20, 94, 151, 0.2);
  }
  .menuItem:hover, .menu:hover .menuItem.selected:hover {
    color: #f5f5f5;
    background-color: var(--color-dark-blue);
  }
  .menu:hover .menuItem.selected {
    color: var(--color-dark-blue);
    background-color: var(--color-grey2);
  }
  .menu:hover .text {
    display:block;
    opacity: 1;
    transition: opacity 0.6s linear;
  }
}
</style>