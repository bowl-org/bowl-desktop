<template>
  <div class="flex flex-col justify-center items-center">
    <ConversationAvatar
      :letter="contact.name.charAt(0)"
      class="w-48 h-48 text-5xl"
    />
    <div class="name flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5">Name:</h2>
      <p class="text-4xl font-medium text-slate-600 mx-20 p-5">
        {{ contact.name }}
      </p>
    </div>
    <h2 class="text-4xl font-bold text-slate-600 p-5">Status:</h2>
    <div
      class="online-status-container flex flex-row justify-center items-center mt-3"
    >
      <OnlineDot :status="isOnline" class="p-2" />
      <p class="text-3xl font-medium ml-3 text-gray-500">
        {{ isOnline ? "online" : "offline" }}
      </p>
    </div>
    <div class="email flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5">Email:</h2>
      <p class="text-4xl font-medium text-slate-600 mx-20 p-5">
        {{ contact.email }}
      </p>
    </div>
    <div class="public-key flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5 w-full">Public Key:</h2>
      <p class="text-4xl font-medium text-slate-600 p-5 mx-20 break-all">
        {{ contact.publicKey }}
      </p>
    </div>
  </div>
</template>
<script>
import ConversationAvatar from "@/components/ConversationAvatar.vue";
import OnlineDot from "@/components/OnlineDot.vue";
import contactConversationService from "@/services/contactConversationService";
export default {
  name: "ContactInfo",
  components: {
    ConversationAvatar,
    OnlineDot,
  },
  data() {
    return {
      contact: {
        name: "",
        email: "",
        publicKey: "",
        isOnline: false,
      },
    };
  },
  computed: {
    isOnline() {
      let activeContactConversation = this.$store.getters.getConversationByIndex(
        this.$store.getters.activeConversationIndex
      );
      return activeContactConversation?.isOnline;
    },
  },
  async created() {
    let contactPerson = await contactConversationService.getContactPersonDetail(
      this.$store.getters.activeConversationId
    );
    let contactModel = {
      name: contactPerson?.name,
      email: contactPerson?.email,
      publicKey: contactPerson?.publicKey,
      isOnline: this.isOnline,
    };
    this.contact = contactModel;
  },
  methods: {},
};
</script>
