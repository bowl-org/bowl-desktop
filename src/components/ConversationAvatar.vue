<template>
  <button
    class="w-12 h-12 text-xl font-semibold rounded-full text-center hover:contrast-125"
  >
    {{ letter }}
  </button>
</template>

<script>
export default {
  name: "ConversationAvatar",
  //  components: {
  //    ConversationList
  //  },
  props: {
    letter: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: #534b62;
  color: #a29eab;
}
</style>
