<template>
  <div
    class="flex flex-col justify-between"
    :class="messageType === 'sent' ? 'items-end' : 'items-start'"
  >
    <p
      class="w-2/3 m-5 p-5 bg-neutral-200 text-black rounded-tr-xl rounded-bl-xl text-left"
      :class="messageType == 'sent' ?  'rounded-tl-xl' : 'rounded-br-xl'"
    >
      {{ message }}
    </p>
    <p :class="messageType == 'sent' ? 'mr-6' : 'ml-6'">
      {{ time }}
    </p>
  </div>
</template>
<script>
export default {
  name: "ChatMessage",
  props: {
    messageType: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
};
</script>
