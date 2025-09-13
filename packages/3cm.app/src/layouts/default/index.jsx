import { clsx } from 'clsx'
import Giscus from "@/components/giscus"
import {
  getAuth, onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth"
import firebaseApp from "@/firebase.js"
export default function () {
  function gotoPay() {
    m.route.set("/loading")
    window.location.href = "https://pay.3cm.app/1-yearly"
  }
  const provider = new GoogleAuthProvider()
  let isLogin = false
  const auth = getAuth(firebaseApp)
  onAuthStateChanged(auth, user => {
    if (user?.emailVerified === true) {
      isLogin = true
    } else {
      isLogin = false
    }
    m.redraw()
  })
  async function signin() {
    try {
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(user)
    } catch (e) {
      const credential = GoogleAuthProvider.credentialFromError(e)
      console.error(e)
    }
  }
  async function signout() {
    await signOut(auth)
  }
  return {
    view({ children }) {
      return (
        <>
          <div class="container mx-auto sm:mt-4 md:mt-10 lg:mt-16">
            <div class="grid content-center">{children}</div>
            <footer class="container px-2 my-4">
              <Giscus></Giscus>
              <p class="w-full text-center">
                © 2024 3CM.APP All Rights Reserved.
              </p>
              <p>
                {isLogin ? (
                  <button class={clsx("nes-btn", {"is-primary": isLogin})} onclick={signout}>Logout</button>
                ) : (
                  <button class={clsx("nes-btn")} onclick={signin}>Login</button>
                )}
                <a
                  href="#"
                  onclick={() => document.getElementById("dialog").showModal()}
                >
                  <i class="nes-icon like"></i>
                </a>
              </p>
            </footer>
            <dialog class="nes-dialog is-rounded translate-[50%]" id="dialog">
              <form method="dialog">
                <p>Visit Support Us page?</p>
                <menu class="dialog-menu flex justify-around">
                  <button class="nes-btn">Cancel</button>
                  <button class="nes-btn is-primary" onclick={gotoPay}>
                    Confirm
                  </button>
                </menu>
              </form>
            </dialog>
          </div>
        </>
      )
    },
  }
}
