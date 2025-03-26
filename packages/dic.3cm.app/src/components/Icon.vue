<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const icon = defineAsyncComponent(() =>
  import(`../assets/${props.name}.svg`)
)
</script>
<!-- https://dev.to/geowrgetudor/dealing-with-svg-icons-in-vue-vite-an9 -->
<template>
  <component :is="icon" />
</template>
