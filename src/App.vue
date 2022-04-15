<template>
  <div class="main-app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header-comp.vue'

export default {
  components: {
    Header
  },
  name: 'App',
  data: () => ({
    screenX: window.screen.availWidth,
    screenY: window.innerHeight
  }),
  methods: {
    set_scale() {
      this.screenX = window.innerWidth
      this.screenY = window.innerHeight
    },
  },
  created() {
    window.addEventListener('resize', this.set_scale)
  },
  mounted() {
    this.back = document.querySelector('.main-app')
    this.back.style.height = `${this.screenY}px`
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.main-app {
  height: available;
  background-color: #323232;
}
</style>
