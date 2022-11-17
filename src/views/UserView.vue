<template>
  <router-view class="pb-16" />
  <ThePolygon/>
</template>
<script>
import ThePolygon from "@/components/ThePolygon.vue"
export default {
  name: 'UserView',
  components: {
    ThePolygon
  }
}

</script>
