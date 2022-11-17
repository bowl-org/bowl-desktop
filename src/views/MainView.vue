<template>
<!--TODO:Dynamically render chat component depends on the conversation-->
    <TheSidebar/>
    <router-view/>
</template>

<script>
// @ is an alias to /src
//import TheChat from '@/components/TheChat.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'MainView',
  data(){
    return {
      status: "online"
    }
  },
  created(){
    this.$router.push({name: 'chat', params: {id: 0}});
  },
  components: {
    //TheChat,
    TheSidebar
  }
}
</script>
