<template>
  <div class="searchbar-container m-5 flex justify-center w-75">
    <button
      class="p-3 pl-5 text-neutral-400 bg-white text-2xl text-center rounded-l-xl"
    >
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </button>
    <input
      type="text"
      placeholder="Search..."
      class="rounded-r-xl p-3 grow"
      @input="updateSearch"
      v-model="searchText"
    />
  </div>
</template>
<script>
export default {
  name: "SearchSidebar",
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    updateSearch() {
      this.$emit("updateSearch", this.searchText);
    },
  },
};
</script>
