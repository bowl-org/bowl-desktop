<template>
  <button class="p-2 pr-0 hover:bounceCustom">
    😀
  </button>
</template>
<script>
export default {
  name: "EmojiButton",
};
</script>
<style>
@keyframes bounceCustom {
0%,
  50%,
  100%{
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  25% {
    transform: translateY(-15%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  75% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.hover\:bounceCustom:hover { animation: bounceCustom 1s infinite; }
</style>
