import { createApp } from "vue"
import App from "./App.vue"
import { auth } from "@/firebase.js"
import { mutations } from "@/store.js"

import PrimeVue from "primevue/config"
import Aura from "@primevue/themes/aura"
import "primeicons/primeicons.css"
import "./main.css"

let app
// https://www.reddit.com/r/webdev/comments/us599i/what_is_the_difference_between_firebase/
auth.onAuthStateChanged((user) => {
  mutations.setUser(user)
  if (!app) {
    app = createApp(App)
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        cssLayer: {
          name: "primevue",
          order: "tailwind-base, primevue, tailwind-utilities",
        },
      },
    })
    app.mount("#app")
  }
})
