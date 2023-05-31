<template>
  <div v-if="showLoading" class="justify-center items-center flex flex-col">
    <div
      class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
    ></div>
  </div>
</template>
<script>
export default {
  name: "LoadingSpinner",
  props:{
    showLoading:{
      type: Boolean,
      default: true
    }
  }

}
</script>

