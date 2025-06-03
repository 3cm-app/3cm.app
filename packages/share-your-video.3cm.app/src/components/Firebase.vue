<template>
  <section id="firebaseui-auth-container"></section>
</template>
<script>
// FirebaseUI is not currently compatible with the v9 modular SDK
import { auth } from "@/firebase.js"
import { GoogleAuthProvider } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  mounted() {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    const uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [GoogleAuthProvider.PROVIDER_ID],
      signInFlow: 'popup', // redirect won't get the user data...
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>
