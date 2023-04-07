<template>
  <div class="m-5 flex justify-center w-75" >
    <button class="conversetaion-type-btn rounded-l-lg p-3 grow " @click="selectConversationType('Favorites')" :class="selectedConversationType === 'Favorites' ? 'selectedType' : 'notSelectedType hover:contrast-75'">
      Favorites
    </button>
    <button
      class="conversetaion-type-btn p-3 grow" @click="selectConversationType('Contact')" :class="selectedConversationType === 'Contact' ? 'selectedType' : 'notSelectedType hover:contrast-75'"
    >
      Contacts
    </button>
    <button class="conversetaion-type-btn rounded-r-lg p-3 grow " @click="selectConversationType('Group')" :class="selectedConversationType === 'Group' ? 'selectedType' : 'notSelectedType hover:contrast-75'">
      Groups
    </button>
  </div>
</template>

<script>
export default {
  name: "ConversationTypeMenu",
  data() {
    return {
      selectedConversationType: "Favorites",
    };
  },
  methods: {
    selectConversationType(conversationType){
      this.selectedConversationType = conversationType;
      this.$emit("getConversationType", this.selectedConversationType);
    },
  },
  created(){
    this.selectConversationType("Favorites");
  }
};
</script>
<style>
.selectedType{
  background-color: #A499B3;
  color: white;
}
.notSelectedType{
  background-color: #FFFFFF;
  color: black;
}
</style>
