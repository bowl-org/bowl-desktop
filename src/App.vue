<template>
  <TheSidebar />
  <TheChat class="grow" :status="status" />
</template>

<script>
import TheSidebar from "./components/TheSidebar.vue";
import TheChat from "./components/TheChat.vue";
import io from "socket.io-client"


export default {
  name: "App",
  components: {
    TheSidebar,
    TheChat
  },
  data() {
    return {
      socket: {},
      senderData: {},
      msgData: {},
      messages: [],
      status: "online"
    };
  },
  methods: {
    add() {},
  },
  created(){
    this.socket = io("http://localhost:3000")
    this.senderData = "Mehmet"
    this.msgData = "Merhaba dünya!"
    this.socket.emit("data",{
      sender: this.senderData,
      data: this.msgData
    });

  },
  mounted(){
    this.socket.on("data", (data) =>{
      console.log(data)
    })
  }
//  created(){
//    setInterval(() =>{
//      if(this.status == "online")
//        this.status = "offline"
//      else
//        this.status = "online"
//    }, 3000)
//  }
};
  //background-color: #2d202c;
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
