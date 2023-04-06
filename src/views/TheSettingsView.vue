<template>
  <div class="flex flex-col grow bg-neutral-100 ">
    <div class="upper-bar flex flex-row justify-between sticky top-0 z-10">
      <h1 class="text-5xl font-medium text-slate-600 p-5">Settings</h1>
      <BackButton class="p-8 " :goBackCounter="goBackCounter" />
    </div>
    <div class="bg-neutral-100 flex flex-row grow  z-0">
      <SettingsSidebar @openSetting="openSetting" />
      <div class="ml-80 grow w-1/2 sticky top-0">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import BackButton from "@/components/BackButton.vue";
import SettingsSidebar from "@/components/SettingsSidebar.vue";
export default {
  name: "TheSettingsView",
  components: {
    BackButton,
    SettingsSidebar,
  },
  data(){
    return {
      goBackCounter: 1
    }
  },
  methods: {
    openSetting(settingName) {
      this.$router.push({ name: `${settingName.toLowerCase()}` });
      this.goBackCounter += 1;
    },
  },
};
</script>
