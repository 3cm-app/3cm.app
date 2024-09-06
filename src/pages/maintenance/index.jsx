import { author } from '../../../package.json'
import './index.css'

export default function () {
  return {
    view: () => {
      return (
        <div class="maintenance mx-8 break-keep">
          <h1 class="text-5xl text-center">We'll be back soon!</h1>
          <div class="text-xl">
            We sincerely apologize for any inconvenience caused as we perform maintenance. If you require assistance, please don't hesitate to <a href={author.url} target="_blank">reach out to us</a>. We'll be back online shortly, and we greatly appreciate your patience and understanding.
            <p class="text-center">- The Dev Team</p>
          </div>
        </div>
      )
    }
  }
}
