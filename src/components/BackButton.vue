<template>
    <button @click="$router.back()" class="bg-neutral-300 text-slate-800 hover:contrast-75 rounded  p-3 m-5 w-12 h-12">
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </button>
</template>
<script>
export default{
  name: 'BackButton'
}
</script>
