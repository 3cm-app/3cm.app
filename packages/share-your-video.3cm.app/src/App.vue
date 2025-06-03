<script setup>
import Firebase from "@/components/Firebase.vue";
import ShareLinkList from "@/components/ShareLinkList.vue";
import DebugFirebaseAuth from "@/components/DebugFirebaseAuth.vue"

import { ref, onErrorCaptured } from "vue"
const error = ref(null)
onErrorCaptured(e => {
  error.value = e
})
</script>
<template>
  <div>
    <Menubar>
      <template #start>
        <img alt="logo" src="./assets/logo.png" class="h-8 p-mr-2" />
      </template>
      <template #end>
        <div v-if="state.user" class="flex items-center gap-2">
          <!-- <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" /> -->
          <Avatar class="cursor-pointer" :label="state.user.displayName" shape="circle" @click="toggle" />
          <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
        </div>
      </template>
    </Menubar>
    <Firebase v-if="!isLogin"></Firebase>
    <ShareLinkList v-else></ShareLinkList>
    <DebugFirebaseAuth v-if="isDebug"></DebugFirebaseAuth>
    <Dialog header="Confirmation" :visible="!!error" :style="{ width: '350px' }" :modal="true"
      @update:visible="error = null">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span>{{ error }}</span>
      </div>
      <template #footer>
        <Button label="Ok" icon="pi pi-check" @click="error = null" class="p-button-danger" autofocus />
      </template>
    </Dialog>
  </div>
</template>
<script>
import { auth } from "@/firebase.js"
import { state, getters } from "@/store.js";

export default {
  data() {
    return {
      menuItems: [
        {
          label: "Logout",
          icon: "pi pi-fw pi-power-off",
          command: this.logout,
          visible: () => this.isLogin
        }
      ]
    };
  },
  computed: {
    debugData() {
      return JSON.stringify(state.user, null, 2);
    },
    isLogin() {
      return getters.isLogin();
    },
    isAdmin() {
      return getters.isAdmin();
    },
    isDebug() {
      return getters.isDebug();
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    async logout() {
      await auth.signOut()
    }
  }
};
</script>
