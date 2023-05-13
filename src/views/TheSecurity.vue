<template>
  <div class="flex flex-col justify-center mx-10">
    <div class="flex flex-row justify-between items-center mb-5">
      <button
        v-if="!isKeysEditing"
        class="text-2xl font-bold text-slate-700 p-5 bg-neutral-200 rounded-xl hover:bg-neutral-300"
        @click="editKeys"
      >
        Edit Keys
      </button>
      <div v-if="isKeysEditing">
        <button
          class="text-2xl font-bold text-slate-700 p-5 mr-5 w-28 bg-neutral-200 rounded-xl hover:bg-blue-300"
          @click="saveKeys"
        >
          Save
        </button>
        <button
          class="text-2xl font-bold text-slate-700 p-5 w-28 bg-neutral-200 rounded-xl hover:bg-red-300"
          @click="isKeysEditing = false"
        >
          Cancel
        </button>
      </div>
      <button
        v-if="!isKeysEditing"
        class="text-2xl font-bold text-white p-5 bg-red-400 rounded-xl hover:bg-red-500"
        @click="generateNewKeyPair"
      >
        Generate New KeyPair
      </button>
    </div>
    <div class="">
      <div class="flex flex-row justify-between items-center pb-5">
        <h2 class="text-3xl font-bold text-slate-600 p-5 text-left">
          Public Key
        </h2>
      </div>
      <div class="bg-gray-300 rounded-xl">
        <p
          v-if="!isKeysEditing"
          class="text-3xl font-medium text-slate-600 p-5 break-all"
        >
          {{ user.publicKey }}
        </p>
        <input
          v-if="isKeysEditing"
          v-model="publicKey"
          type="text"
          class="text-3xl font-medium text-slate-600 p-5 break-all"
        />
      </div>
    </div>
    <div class="mt-10">
      <div class="flex flex-row justify-between items-center pb-5">
        <h2 class="text-3xl font-bold text-slate-600 p-5 text-left">
          Private Key
        </h2>
      </div>
      <div class="bg-gray-300 rounded-xl">
        <p
          v-if="!isKeysEditing"
          class="text-3xl font-medium text-slate-600 p-5 break-all"
        >
          {{ user.privateKey }}
        </p>
        <input
          v-if="isKeysEditing"
          v-model="privateKey"
          type="text"
          class="text-3xl font-medium text-slate-600 p-5 break-all"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheSecurity",
  data() {
    return {
      isKeysEditing: false,
      privateKey: "",
      publicKey: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    console.log(this.$store.getters.user);
    this.publicKey = this.user.publicKey;
    this.privateKey = this.user.privateKey;
  },
  methods: {
    generateNewKeyPair() {
      console.log("Generate new key pair");
    },
    editKeys() {
      this.isKeysEditing = true;
    },
    saveKeys(){
      this.isKeysEditing = false;
    }
  },
};
</script>
