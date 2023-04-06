<template>
<!--@click="$router.back()"-->
    <button @click="$router.go(-goBackCounter)" class="bg-neutral-300 text-slate-800 hover:contrast-75 rounded  p-3 m-5 w-12 h-12 flex justify-center items-center ">
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </button>
</template>
<script>
export default{
  name: 'BackButton',
  props:{
    goBackCounter:{
      default: 1
    }

  }
}
</script>
