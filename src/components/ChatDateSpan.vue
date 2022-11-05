<template>
  <div class="m-10">
    <span class="bg-neutral-200 opacity-70 rounded-full p-4 shadow">
      {{ date }}
    </span>
  </div>
</template>
<script>
export default {
  name: "ChatDateSpan",
  props: {
    date: {
      type: String,
      required: true,
    },
  },
};
</script>
