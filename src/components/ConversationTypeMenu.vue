<template>
  <div class="m-5 flex justify-center w-75" >
    <button class="conversetaion-type-btn rounded-l-lg p-3 grow " @click="selectConversationType('Favorites')" :class="activeConversationType === 'Favorites' ? 'selectedType' : 'notSelectedType'">
      Favorites
    </button>
    <button
      class="conversetaion-type-btn p-3 grow" @click="selectConversationType('Friends')" :class="activeConversationType === 'Friends' ? 'selectedType' : 'notSelectedType'"
    >
      Friends
    </button>
    <button class="conversetaion-type-btn rounded-r-lg p-3 grow " @click="selectConversationType('Groups')" :class="activeConversationType === 'Groups' ? 'selectedType' : 'notSelectedType'">
      Groups
    </button>
  </div>
</template>

<script>
export default {
  name: "ConversationTypeMenu",
  data() {
    return {
      activeConversationType: "Favorites",
    };
  },
  methods: {
    selectConversationType(conversationType){
      this.activeConversationType = conversationType;
    }
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
