<template>
  <div
    class="bg-slate-300 w-full h-full flex flex-col justify-center items-center"
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
  name: "PopupError",
  props: {
    errorMsg: {
      type: String,
      required: true,
    },
  },
  created() {},
  methods: {
    ok() {
      this.$emit("ok");
    },
  },
};
</script>
