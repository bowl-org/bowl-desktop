<template>
  <template v-for="member in members" :key="member">
    <MemberBox
      :isOnline="member.isOnline"
      :name="member.name"
      :isAdmin="member.isAdmin"
    />
  </template>
</template>
<script>
import MemberBox from "./MemberBox.vue";
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
    this.members = [
      {
        isOnline: false,
        name: "Demo",
        isAdmin: false,
      },
      {
        isOnline: true,
        name: "Lorem Ipsum",
        isAdmin: true,
      },
    ];
  },
  methods: {},
};
</script>
