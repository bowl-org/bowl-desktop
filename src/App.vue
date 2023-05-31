<template>
  <router-view />
  <!--Testing without router-->
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {
    add() {},
  },
  created() {
    this.$router.push({ path: "/" });
  },
};
</script>

<style>
#app {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  -webkit-app-region: drag;
}
button {
  -webkit-app-region: no-drag;
  user-select: none;
}
::-webkit-scrollbar {
  background-color: gray;
  border-radius: 10px;
  width: 0.65rem;
}
::-webkit-scrollbar-thumb {
  background: #483e5b;
  border-radius: 10px;
}
</style>
