<template>
  <div
    class="cursor-pointer select-none flex justify-between items-center p-10 px-16 m-3 rounded-xl"
    :class="
      isActive
        ? 'bg-neutral-300 '
        : 'bg-neutral-200 hover:bg-neutral-300'
    "
  >
    <h1 class="text-xl font-medium text-slate-600">{{ itemName }}</h1>
  </div>
</template>
<script>
export default {
  name: "NewConversationItem",
  props: {
    itemName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
    },
  },
};
</script>
<style>
</style>
