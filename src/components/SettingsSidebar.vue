<template>
  <div class="bg-neutral-100 flex flex-col w-80 max-h-screen overflow-x-hidden fixed">
    <SettingItem
      v-for="(setting, index) in settingList"
      :key="setting"
      @click="openSetting(index)"
      :isActive="setting.isActive"
      :itemName="setting.name"
    />
  </div>
</template>
<script>
import SettingItem from "@/components/SettingItem.vue";
export default {
  name: "SettingsSidebar",
  components: {
    SettingItem,
  },
  data() {
    return {
      settingList: [
        {
          name: "Profile",
          isActive: false,
        },
        {
          name: "Security",
          isActive: false,
        },
        {
          name: "About",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    openSetting(index) {
      let setting = this.settingList.find((x) => x.isActive);
      if (setting != null) {
        setting.isActive = false;
      }
      this.settingList[index].isActive = true;
      this.$emit("openSetting", this.settingList[index].name);
    },
  },
};
</script>
<style>
.settings-sidebar {
  background-color: #f7f8fb;
}
</style>
