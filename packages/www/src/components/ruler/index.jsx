import "./index.css"
export default function () {
  return {
    view: function () {
      const max = 30
      return (
        <div class="ruler">
          {[...Array(max)].map((x, i) =>
            <div class="cm">
              <div class="mm"></div>
              <div class="mm"></div>
              <div class="mm"></div>
              <div class="mm"></div>
              <div class="mm"></div>
              <div class="mm"></div>
              <div class="mm"></div>
              <div class="mm"></div>
              <div class="mm"></div>
            </div>
          )}
        </div>
      )
    },
  }
}
