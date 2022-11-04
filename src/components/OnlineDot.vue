<template>
  <span v-if="online === 'true'" class="rounded-full bg-sky-500 w-2.5 h-2.5 inline-block"/>
  <span v-else class="rounded-full bg-red-500 w-2.5 h-2.5 inline-block"/>
</template>
<script>
export default {
  name: "OnlineDot",
  components: {},
  props: {
    online: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
