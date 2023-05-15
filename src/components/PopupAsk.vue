<template>
  <div
    class="bg-slate-300 w-full h-full flex flex-col justify-center items-center"
  >
    <h1 class="text-2xl font-medium">{{question}}</h1>
    <div class="flex flex-row">
      <button
        class="text-2xl m-5 font-bold text-white w-20 h-16 bg-green-500 rounded-xl hover:bg-green-600"
        @click="yes"
      >
        Yes
      </button>
      <button
        class="text-2xl m-5 font-bold text-white w-20 h-16 bg-red-500 rounded-xl hover:bg-red-600"
        @click="no"
      >
        No
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "PopupAsk",
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  created() {},
  methods: {
    yes() {
      this.$emit("yes");

    },
    no() {
      this.$emit("no");

    },
  },
};
</script>
