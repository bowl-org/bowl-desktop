<template>
  <div class="flex flex-col justify-center items-center">
    <div class="mx-10">
      <div class="flex flex-row justify-between items-center pb-5">
        <h2 class="text-3xl font-bold text-slate-600 p-5 text-left">
          Public Key
        </h2>
        <button
          class="text-2xl font-bold text-slate-700 p-5 bg-neutral-200 rounded-xl hover:bg-neutral-300"
        >
          Edit
        </button>
      </div>
      <div class="bg-gray-300 rounded-xl">
        <p class="text-3xl font-medium text-slate-600 p-5 break-all">
          {{ user.publicKey }}
        </p>
      </div>
    </div>
    <div class="mx-10 mt-10">
      <div class="flex flex-row justify-between items-center pb-5">
        <h2 class="text-3xl font-bold text-slate-600 p-5 text-left">
          Private Key
        </h2>
        <button
          class="text-2xl font-bold text-slate-700 p-5 bg-neutral-200 rounded-xl hover:bg-neutral-300"
        >
          Edit
        </button>
      </div>
      <div class="bg-gray-300 rounded-xl">
        <p class="text-3xl font-medium text-slate-600 p-5 break-all">
          {{ user.privateKey }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheSecurity",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    console.log(this.$store.getters.user);
  },
};
</script>
