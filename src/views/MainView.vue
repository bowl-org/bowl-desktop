<template>
    <TheSidebar/>
    <TheChat/>
</template>

<script>
// @ is an alias to /src
import TheChat from '@/components/TheChat.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'MainView',
  components: {
    TheChat,
    TheSidebar
  }
}
</script>
