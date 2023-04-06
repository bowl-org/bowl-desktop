<template>
  <div class="flex flex-col grow">
    <div class="upper-bar flex flex-row justify-between bg-neutral-100 ">
      <h1 class="text-5xl font-medium text-slate-600 p-5">Settings</h1>
      <BackButton class="p-8 flex  justify-center"/>
    </div>
  <div class="bg-neutral-100 flex flex-row grow">
      <SettingsSidebar @openSetting="openSetting"/>
      <div class="grow">
    <router-view/>
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
  methods: {
    openSetting(settingName){
      this.$router.push({name: `${settingName.toLowerCase()}`})


    }
  }
};
</script>
