<template>
  <TheSidebar class="hidden" />
  <TheChat class="grow hidden" :status="status" />
  <!--Testing without router-->
  <SignUp class="pb-16 hidden" />
  <ForgotPassword class="pb-16 " />
  <LogIn class="pb-16 hidden" />
  <ThePolygon/>
</template>

<script>
import TheSidebar from "./components/TheSidebar.vue";
import TheChat from "./components/TheChat.vue";
import SignUp from "./components/SignUp.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import LogIn from "./components/LogIn.vue";
import ThePolygon from "./components/ThePolygon.vue"

export default {
  name: "App",
  components: {
    TheSidebar,
    TheChat,
    SignUp,
    ForgotPassword,
    LogIn,
    ThePolygon
  },
  data() {
    return {
      socket: {},
      senderData: {},
      msgData: {},
      messages: [],
      status: "online",
    };
  },
  methods: {
    add() {},
  },
  //  created(){
  //    this.socket = io("http://localhost:3000")
  //    this.senderData = "Mehmet"
  //    this.msgData = "Merhaba dünya!"
  //    this.socket.emit("data",{
  //      sender: this.senderData,
  //      data: this.msgData
  //    });
  //},
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
  flex-direction: column;
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
