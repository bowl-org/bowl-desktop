<template>
  <div
    v-if="showError"
    class="bg-slate-300 w-full flex flex-col justify-center items-center"
  >
    <h1 class="text-4xl font-medium p-9">Something went wrong!</h1>
    <h2 class="text-2xl font-medium px-16">{{ errorMsg }}</h2>
    <div class="flex flex-row">
      <button
        class="text-2xl m-5 font-bold text-white w-20 h-16 bg-red-600 rounded-xl hover:bg-red-800"
        @click="ok"
      >
        Ok
      </button>
    </div>
  </div>
</template>
<script>
export default {
  //USAGE
  //<PopupError ref="popupError" @ok="showError = false" @alertError="showError = true" />
  //this.$refs.popupError.alertError(err);
  name: "PopupError",
  data() {
    return {
      showError: false,
    };
  },
  methods: {
    ok() {
      this.showError = false;
      this.$emit("ok");
    },
    alertError(err) {
      this.errorMsg = err;
      this.showError = true;
      this.$emit("alertError");
    },
  },
};
</script>
