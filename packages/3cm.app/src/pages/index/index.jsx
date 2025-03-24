import Ruler from "@/components/ruler"
import services from './index.data.js'
export default function () {
  const minCount = 3
  const maxCount = 30
  const s = "０１２３４５６７８９".split("")
  function digits2fullSize(num) {
    return num
      .toString()
      .split("")
      .map((i) => s[i])
      .join("")
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
  function getText() {
    const n = digits2fullSize(clicked)
    if (clicked >= maxCount) {
      return `達到${n}ｃｍ，太棒了！`
    }
    if (clicked >= 10) {
      return `有${n}ｃｍ了。`
    }
    return `只有${n}ｃｍ。`
  }
  return {
    view() {
      return (
        <>
          <section class="nes-container w-full mb-4">
            <div class="w-full flex">
              <i class="nes-octocat animate"></i>
              <div class="nes-balloon from-left">
                <p class="text-2xl">
                  <a href="#">#</a> {services.title}
                </p>
              </div>
            </div>
            {services.data.map((row, i) => {
              return (
                <div class="mb-6">
                  <div
                    class={
                      "nes-container with-title is-centered" +
                      (i % 2 === 0 ? "" : " is-dark")
                    }
                  >
                    <p class="title">{row.name}</p>
                    <p>{row.description}</p>
                  </div>
                </div>
              )
            })}
          </section>
          <section class="nes-container w-full mb-4">
            <div class="columns-1">
              <div class="w-full flex">
                <i class="nes-bcrikko"></i>
                <div class="nes-balloon from-left">
                  <p class="text-2xl">
                    <a href="#">#</a> About us
                  </p>
                </div>
              </div>
              <div class="w-full">
                <img
                  src="logo-2.jpg"
                  class="h-16"
                  style={`width: ${(100 / maxCount) * clicked}%`}
                />
              </div>
              <Ruler></Ruler>
              <div class="w-full flex justify-end">
                <div class="nes-balloon from-right">
                  <p class="text-2xl">{getText()}</p>
                </div>
                <i class="nes-bcrikko"></i>
              </div>
              <div class="w-full flex justify-center">
                <button
                  class={
                    "nes-btn " + (clicked <= minCount ? "is-disabled" : "")
                  }
                  onclick={decrease}
                  disabled={clicked <= minCount}
                >
                  Too much
                </button>
                <button
                  class={
                    "nes-btn " +
                    (clicked >= maxCount ? "is-disabled" : "is-success")
                  }
                  onclick={increase}
                  disabled={clicked >= maxCount}
                >
                  You're not
                </button>
              </div>
            </div>
          </section>
        </>
      )
    },
  }
}
