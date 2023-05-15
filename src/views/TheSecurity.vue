<template>
  <PopupAsk
    v-if="showPopup"
    question="Do you want to generate new key pair?"
    @yes="generateNewKeypair"
    @no="showPopup = false"
  />
  <PopupError ref="popupError" @ok="showError = false" @alertError="showError = true" />
  <div
    v-if="!showPopup && !showError"
    class="flex flex-col justify-center mx-10"
  >
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
          @click="cancelEditing"
        >
          Cancel
        </button>
      </div>
      <button
        v-if="!isKeysEditing"
        class="text-2xl font-bold text-white p-5 bg-red-400 rounded-xl hover:bg-red-500"
        @click="askToGenerateKeypair"
      >
        Generate New KeyPair
      </button>
    </div>
    <div v-if="!isKeysEditing">
      <div class="flex flex-row justify-between items-center pb-5">
        <h2 class="text-3xl font-bold text-slate-600 p-5 text-left">
          Public Key
        </h2>
      </div>
      <div class="bg-gray-300 p-5 rounded-xl">
        <p class="text-3xl font-medium text-slate-600 p-5 break-all">
          {{ user.publicKey }}
        </p>
      </div>
    </div>
    <div :class="isKeysEditing ? '' : 'mt-10'">
      <div class="flex flex-row justify-between items-center pb-5">
        <h2 class="text-3xl font-bold text-slate-600 p-5 text-left">
          Private Key
        </h2>
      </div>
      <div class="bg-gray-300 rounded-xl p-5" spellcheck="false">
        <p
          v-if="!isKeysEditing"
          class="text-3xl font-medium text-slate-600 p-5 break-all"
        >
          {{ user.privateKey }}
        </p>
        <textarea
          v-if="isKeysEditing"
          v-model="privateKey"
          class="text-area w-full p-5 resize-none bg-gray-200 text-3xl font-medium break-all"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PopupAsk from "@/components/PopupAsk";
import PopupError from "@/components/PopupError";
import cryptionService from "@/services/cryptionService";
import userService from "@/services/userService";
export default {
  name: "TheSecurity",
  components: {
    PopupAsk,
    PopupError,
  },
  data() {
    return {
      isKeysEditing: false,
      privateKey: "",
      publicKey: "",
      showPopup: false,
      showError: false,
      errorMsg: "",
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
    askToGenerateKeypair() {
      this.showPopup = true;
    },
    async generateNewKeypair() {
      try {
        this.showPopup = false;
        const keypair = await cryptionService.generateKeyPair();
        await userService.updateCurrentUserKeypair(keypair);
      } catch (err) {
        this.$refs.popupError.alertError(err);
      }
    },
    editKeys() {
      this.isKeysEditing = true;
    },
    async saveKeys() {
      try {
        this.isKeysEditing = false;
        let keypair = {
          publicKey: this.user.publicKey,
          privateKey: this.privateKey,
        };
        console.log(
          "Current private key hash",
          await cryptionService.generateHash(this.user.privateKey)
        );
        console.log(
          "Current public key hash",
          await cryptionService.generateHash(this.user.publicKey)
        );
        keypair.publicKey = await cryptionService.generatePublicKeyFromPrivate(
          keypair.privateKey
        );
        console.log(
          "Updated private key hash",
          await cryptionService.generateHash(keypair.privateKey)
        );
        console.log(
          "Updated public key hash",
          await cryptionService.generateHash(keypair.publicKey)
        );
        await userService.updateCurrentUserKeypair(keypair);
      } catch (err) {
        this.privateKey = this.user.privateKey;
        this.$refs.popupError.alertError(err);
      }
    },
    cancelEditing() {
      this.isKeysEditing = false;
      this.privateKey = this.user.privateKey;
    },
  },
};
</script>
<style>
.text-area {
  box-sizing: border-box;
  height: 300px;
}
</style>
