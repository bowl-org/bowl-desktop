<template>
  <div class="searchbar-container m-5 flex justify-center w-75">
    <button class="p-1.5 m-0 bg-white rounded-l-xl grow">
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        class="text-center m-2 text-2xl text-neutral-400"
      />
    </button>
    <input type="text" placeholder="Search..." class="rounded-r-xl p-3 grow" />
  </div>
</template>
<script>
export default {
  name: "SearchSidebar",
};
</script>
