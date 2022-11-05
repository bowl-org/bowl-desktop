<template>
    <TheSidebar/>
    <TheChat class="grow" :status="status"/>
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
      status: "online"
    };
  },
  methods: {
    add() {},
  },
  created(){
    setInterval(() =>{
      if(this.status == "online")
        this.status = "offline"
      else
        this.status = "online"
    }, 3000)
  }
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
body {
  -webkit-app-region: drag;
}
button {
  -webkit-app-region: no-drag;
}
::-webkit-scrollbar{
  background-color: gray;
  width: .65rem;
}
::-webkit-scrollbar-thumb {
  background: #483E5B;
  border-radius: 10px;
}
</style>
