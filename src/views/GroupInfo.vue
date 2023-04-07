<template>
  <div class="flex flex-col justify-center items-center">
    <ConversationAvatar
      :letter="group.name.charAt(0)"
      class="w-48 h-48 text-5xl"
    />

    <div class="name flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5">Group Name:</h2>
      <p class="text-4xl font-medium text-slate-600 mx-20  p-5">
        {{ group.name }}
      </p>
    </div>
    <div class="name flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5">Group Description:</h2>
      <p class="text-4xl font-medium text-slate-600 mx-20  p-5">
        {{ group.description }}
      </p>
    </div>
    <div class="public-key flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5 w-full">Key:</h2>
      <p class="text-4xl font-medium text-slate-600 p-5 mx-20 break-all">
        {{ group.key }}
      </p>
    </div>
  </div>
</template>
<script>
import ConversationAvatar from "@/components/ConversationAvatar.vue";
export default {
  name: "GroupInfo",
  components: {
    ConversationAvatar
  },
  data() {
    return {
      group: {
        name: "",
        description: "",
        key: "",
      },
    }
  },
  created(){
    let groupModel = {
      name: "",
      key: "2F413F4428472B4B6250655368566D5971337436763979244226452948404D63",
      description: "This is a group description"
      // conversationType: "",
      // lastMessageTimestamp: "",
      // lastMessage: "",
    };
    let activeGroup = this.$store.getters.getConversationById(
      this.$store.getters.activeConversationId
    );
    groupModel.name = activeGroup.name;
    this.group = groupModel;
  },
  methods: {
  },
};
</script>
