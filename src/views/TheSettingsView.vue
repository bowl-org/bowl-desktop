<template>
  <div class="flex flex-col grow justify-center items-center">
    <h1 class="text-xl font-medium text-slate-600">Settings</h1>
    <BackButton/>
  </div>
</template>
<script>
import BackButton from "@/components/BackButton.vue"
export default {
  name: "TheSettingsView",
  components: {
    BackButton
  }
};
</script>
