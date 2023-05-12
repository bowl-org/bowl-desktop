<template>
  <div
    class="flex flex-col justify-between break-all"
    :class="isSenderUser == 1 ? 'items-end' : 'items-start'"
  >
    <p
      class="w-2/3 m-5 p-5  text-black rounded-tr-xl rounded-bl-xl text-left"
      :class="isSenderUser == 1 ?  'rounded-tl-xl sent-msg' : 'rounded-br-xl bg-neutral-200'"
    >
      {{ message }}
    </p>
    <p :class="isSenderUser == 1 ? 'mr-6' : 'ml-6'">
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
    isSenderUser: {
      type: Number,
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
<style>
.sent-msg{
  background-color: #A499B3;
}
</style>
