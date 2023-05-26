<template>
  <button
    class="flex flex-row justify-center items-center bg-green-400 p-5 rounded-xl text-3xl"
    @click="addMember"
  >
    <font-awesome-icon icon="fa-solid fa-user-plus" />
    <p class="ml-5 text-neutral-100 text-4xl font-medium text-end">
      Add Member
    </p>
  </button>
  <template v-for="member in members" :key="member">
    <MemberBox
      :name="member.name"
      :isAdmin="member.isAdmin"
      :email="member.email"
    />
  </template>
</template>
<script>
import MemberBox from "./MemberBox.vue";
import groupConversationService from "@/services/groupConversationService";
export default {
  name: "GroupMembers",
  components: {
    MemberBox,
  },
  data() {
    return {
      members: [],
    };
  },
  created() {
    groupConversationService
      .getGroupMembersOfGroup(this.$store.getters.activeConversationId)
      .then((members) => {
        this.members = members;
      });
  },
  methods: {
    addMember() {
      console.log("Add member");
      this.$router.push({ name: "addmember" });
    },
  },
};
</script>
