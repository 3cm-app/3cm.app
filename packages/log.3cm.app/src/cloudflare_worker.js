import { handleRequest } from './handle.js'
export default {
  async fetch(req, env, ctx) {
    const id = req.headers.get('cf-ray')
    const text = await req.text()
    ctx.waitUntil(handleRequest(id, req, text, env))
    return new Response('')
  },
}
