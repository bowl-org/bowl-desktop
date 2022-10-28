<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld class="text-gray-300" msg="P2P Chat System"/>
  <div class="bg-gray-300 text-sky-500 hover:font-bold"> Bold on hover </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #2D202C;
  margin-top: 60px;
}
</style>
