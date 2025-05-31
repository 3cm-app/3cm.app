import Giscus from "@/components/giscus"

export default function () {
  function gotoPay() {
    m.route.set("/loading")
    window.location.href = "https://pay.3cm.app/1-yearly"
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
                © 2024 3CM.APP{" "}
                <a
                  href="#"
                  onclick={() => document.getElementById("dialog").showModal()}
                >
                  <i class="nes-icon like"></i>
                </a>{" "}
                All Rights Reserved.
              </p>
            </footer>
            <dialog class="nes-dialog is-rounded" id="dialog">
              <form method="dialog">
                <p>Visit support us page?</p>
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
