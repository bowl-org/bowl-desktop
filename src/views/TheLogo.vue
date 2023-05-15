<template>
  <div class="grow overflow-clip max-h-screen flex flex-col items-center justify-center bg-logo ">
    <div class="overflow-crop h-1/2">
      <img class="w-auto max-h-full" src="../assets/logo.webp" alt="logo" />
    </div>
    <div class="">
      <h1 class="text-yellow-100 text-8xl">Bowl Chat</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheLogo",
};
</script>
<style>
.bg-logo {
  background-color: #2d202c;
}
</style>
