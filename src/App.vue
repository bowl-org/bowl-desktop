<template>
  <div class="flex flex-row">
    <TheSidebar/>
    <div class="msg-box p-10 bg-neutral-300">
      <p class="m-5 p-2 bg-indigo-900 text-gray-300 rounded-tr-lg">
        Hello world
      </p>
      <p class="m-5 p-2 bg-indigo-900 text-gray-300 rounded-tr-lg">
        Hello world
      </p>
    </div>
    <input class="bg-slate-500 text-gray-300" placeholder="Enter message" />
    <button
      class="w-8 h-8 ml-5 rounded-full bg-sky-500 hover:bg-slate-600 text-white"
      @click="add"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <HelloWorld class="text-gray-300" msg="P2P Chat System" />
    <div class="bg-gray-300 text-sky-500 hover:font-bold">Bold on hover</div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import TheSidebar from "./components/TheSidebar.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    TheSidebar,
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
