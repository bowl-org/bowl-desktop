<template>
  <span class="rounded-full bg-sky-500 w-2.5 h-2.5 inline-block" :class="status == 'online' ? 'bg-sky-500' : 'bg-red-500'"/>
</template>
<script>
export default {
  name: "OnlineDot",
  components: {},
  props: {
    status: {
      type: String,
      required: true,
    },
  },
};
</script>
