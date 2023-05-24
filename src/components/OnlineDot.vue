<template>
  <div
    v-if="dotSize != ' '"
    :class="
      status
        ? 'bg-sky-500 rounded-full w-' + dotSize + ' h-' + dotSize + ' inline-block'
        : 'bg-red-500 rounded-full w-' + dotSize + ' h-' + dotSize + ' inline-block'
    "
  />
  <div
    v-else
    class="rounded-full w-2.5 h-2.5 inline-block"
    :class="status ? 'bg-sky-500 ' : 'bg-red-500'"
  />
</template>
<script>
export default {
  name: "OnlineDot",
  components: {},
  props: {
    status: {
      type: Boolean,
    },
    dotSize: {
      type: String,
      default: " "
    },
  },
};
</script>
