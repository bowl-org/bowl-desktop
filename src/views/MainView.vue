<template>
<!--TODO:Dynamically render chat component depends on the conversation-->
    <TheSidebar class="sticky top-0"/>
    <router-view class="overflow-hidden"/>
</template>

<script>
// @ is an alias to /src
//import TheChat from '@/components/TheChat.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import socketService from '@/services/socketService'

export default {
  name: 'MainView',
  data(){
    return {
      //status: "online"
    }
  },
  created(){
    socketService.initSocket();
    this.$router.push({name: 'chat', params: {id: 0}});
  },
  components: {
    //TheChat,
    TheSidebar
  }
}
</script>
