<template>
    <TheSidebar/>
    <TheChat class="grow" status="online"/>
</template>

<script>
import TheSidebar from "./components/TheSidebar.vue";
import TheChat from "./components/TheChat.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheChat
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    add() {},
  },
};
  //background-color: #2d202c;
</script>

<style>
#app {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  min-height:100vh;
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
