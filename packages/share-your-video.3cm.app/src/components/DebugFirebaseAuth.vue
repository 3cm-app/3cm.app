<template>
  <textarea :disabled="true" v-model="user" :style="{
    minHeight: '600px',
    minWidth: '500px',
  }"></textarea>
</template>
<script>
import { state } from "@/store.js";

export default {
  computed: {
    user() {
      return JSON.stringify(state.user, null, 2);
    }
  }
};
</script>
