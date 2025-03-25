import http from 'http'
import c_tg from '../.config/telegram.org/config.json' assert { type: 'json' }
import { handleRequest } from './handle.js'

const requestListener = function (req, res) {
  const id = Math.random()
  const start = new Date
  console.log('[%s] [%o] start receiving request', start.toISOString(), id)
  console.log('%s %s HTTP/%s', req.method, req.url, req.httpVersion)
  for (let i = 0; i < req.rawHeaders.length; i+=2) {
    process.stdout.write(`${req.rawHeaders[i]}: ${req.rawHeaders[i+1]}\n`)
  }
  process.stdout.write(`\n`)

  let text = ''
  req.on('data', function (chunk) {
    const d = chunk.toString()
    process.stdout.write(d)
    text += d
  })
  req.on('end', async function() {
    process.stdout.write('\n')
    const end = new Date
    const diff = BigInt(end.valueOf()) - BigInt(start.valueOf())
    console.log('[%s] [%o] end receiving (+%o ms)', end.toISOString(), id, diff)
    try {
      await handleRequest(req, text, {
        TELEGRAM_BOT_TOKEN: c_tg.token,
        TELEGRAM_CHAT_ID: c_tg.chat_id
      }, {id})
    } catch (e) {
      console.error(e)
    } finally {
      const finish = new Date
      const diff = BigInt(finish.valueOf()) - BigInt(end.valueOf())
      console.log('[%s] [%o] finish handleRequest (+%o ms)', finish.toISOString(), id, diff)
    }
  })
  res.writeHead(200)
  res.end()
}

const server = http.createServer(requestListener);
server.listen(3000)
