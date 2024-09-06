import Ruler from '@/components/ruler'

export default function () {
  const minCount = 3
  const maxCount = 30
  const s = '０１２３４５６７８９'.split('')
  function digits2fullSize(num) {
    return num.toString().split('').map(i => s[i]).join('')
  }
  let clicked = minCount
  function decrease() {
    if (clicked - 1 < minCount) {
      return
    }
    clicked--
  }
  function increase() {
    if (clicked + 1 > maxCount) {
      return
    }
    clicked++
  }
  function gotoPay() {
    m.route.set("/loading")
    window.location.href = 'https://pay.3cm.app/1-yearly'
  }
  function getText() {
    const n = digits2fullSize(clicked)
    if (clicked >= maxCount) {
      return `有${n}ｃｍ，很棒！`
    }
    return `您只有${n}ｃｍ。`
  }
  return {
    view () {
      return (
        <>
          <section class="nes-container w-full">
            <div class="columns-1">
              <div class="w-full flex aspect-auto">
                <i class="nes-octocat animate from-left"></i>
                <div class="nes-balloon">
                  <p class="text-2xl">您好，歡迎點讚！</p>
                </div>
              </div>
              <div class="w-full" >
                <img src="logo-2.jpg" class="h-16" style={`width: ${100 / maxCount * clicked}%`}/>
              </div>
              <Ruler></Ruler>
              <div class="w-full flex justify-end">
                <div class="nes-balloon from-right">
                  <p class="text-2xl">{getText()}</p>
                </div>
                <i class="nes-bcrikko"></i>
              </div>
            </div>
          </section>
          <div class="columns-1">
            <div class="w-full flex justify-center" >
              <button class={"nes-btn " + (clicked <= minCount ? "is-disabled" : "")} onclick={decrease} disabled={clicked <= minCount}>Too much</button>
              <button class={"nes-btn " + (clicked >= maxCount ? "is-disabled" : "is-success")} onclick={increase} disabled={clicked >= maxCount}>I'm not</button>
            </div>
          </div>
          <div class="nes-container with-title is-centered">
            <p>© 2024 3CM.APP <a href="#" onclick={() => document.getElementById('dialog').showModal()}><i class="nes-icon like"></i></a> All Rights Reserved.</p>
          </div>
          <dialog class="nes-dialog is-rounded" id="dialog">
            <form method="dialog">
              <p>Visit support us page?</p>
              <menu class="dialog-menu flex justify-around">
                <button class="nes-btn">Cancel</button>
                <button class="nes-btn is-primary" onclick={gotoPay}>Confirm</button>
              </menu>
            </form>
          </dialog>
        </>
      )
    }
  }
}
