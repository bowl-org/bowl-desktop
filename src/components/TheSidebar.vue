<template>
  <div class="bg-blue-900 min-h-max w-full min-w-max ">
    <button
      class="w-8 h-8 ml-5 rounded-full bg-sky-500 hover:bg-slate-600 text-white"
      @click="add"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
  </div>
</template>

<script>
//import ConversationList from './components/ConversationList.vue'-->
export default {
  name: 'TheSidebar',
//  components: {
//    ConversationList
//  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
