<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>
<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>
