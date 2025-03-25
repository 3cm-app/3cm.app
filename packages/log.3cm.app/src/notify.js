import https from 'node:https'

export async function tg(reqId, text, mode, env) {
    const start = new Date
    console.log('[%s] [%o] start notifying tg, showing response', start.toISOString(), reqId)
    const data = {
        chat_id: env.TELEGRAM_CHAT_ID,
        text
    }
    if (mode) {
        data.parse_mode = mode
    }
    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // let raw = []
    const req = https.request(options, (res) => {
        console.log('HTTP/%s %s %s', res.httpVersion, res.statusCode, res.statusMessage)
        for (let i = 0; i < res.rawHeaders.length; i+=2) {
          process.stdout.write(`${res.rawHeaders[i]}: ${res.rawHeaders[i+1]}\n`)
        }
        process.stdout.write(`\n`)
        res.on('data', (d) => {
            process.stdout.write(d)
            // raw.push(d)
        })
        res.on('error', (e) => {
            console.error(e)
        })
        res.on('end', () => {
            // const data = Buffer.concat(raw).toString()
            const end = new Date
            const diff = BigInt(end.valueOf()) - BigInt(start.valueOf())
            console.log('\n[%s] [%o] end notifying tg (+%o ms)', end.toISOString(), reqId, diff)
        })
    })
    req.on('error', (e) => {
        console.error(e)
    })
    req.write(JSON.stringify(data))
    req.end()
}
