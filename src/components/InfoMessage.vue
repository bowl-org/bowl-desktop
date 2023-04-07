<template>
  <div class="relative flex flex-row justify-center items-center p-4">
    <h3
      class="font-semibold text-xl absolute"
      :class="status == 'FAILURE' ? 'text-red-500' : 'text-green-500'"
    >
      {{ message }}
    </h3>
  </div>
</template>
<script>
export default {
  name: "InfoMessage",
  props: {
    status: {
      type: String,
      default: "SUCCESS",
    },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>
