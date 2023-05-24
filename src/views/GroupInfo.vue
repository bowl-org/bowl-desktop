<template>
  <div class="flex flex-col justify-center items-center">
    <ConversationAvatar
      :letter="group.name.charAt(0)"
      class="w-48 h-48 text-5xl"
    />

    <div class="name flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5">Group Name:</h2>
      <p class="text-4xl font-medium text-slate-600 mx-20 p-5">
        {{ group.name }}
      </p>
    </div>
    <div class="name flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5">Group Description:</h2>
      <p class="text-4xl font-medium text-slate-600 mx-20 p-5">
        {{ group.description }}
      </p>
    </div>
    <div class="public-key flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5 w-full">Key:</h2>
      <p class="text-4xl font-medium text-slate-600 p-5 mx-20 break-all">
        {{ group.groupKey }}
      </p>
    </div>
    <div class="group-members flex flex-col justify-center items-center w-full px-12">
      <h2 class="text-4xl font-bold text-slate-600 p-5">Group Members</h2>
      <GroupMembers/>
    </div>

  </div>
</template>
<script>
import ConversationAvatar from "@/components/ConversationAvatar.vue";
import GroupMembers from "@/components/GroupMembers.vue";
export default {
  name: "GroupInfo",
  components: {
    ConversationAvatar,
    GroupMembers
  },
  data() {
    return {
      group: {
        groupKey: "",
        name: "",
        description: "",
      },
    };
  },
  created() {
    let activeGroup = this.$store.getters.getConversationById(
      this.$store.getters.activeConversationId
    );
    console.log("Active group:",activeGroup)
    this.group = activeGroup;
  },
  methods: {},
};
</script>
