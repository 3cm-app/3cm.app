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
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetch(url, options)
    const end = new Date
    const diff = BigInt(end.valueOf()) - BigInt(start.valueOf())
    console.log('\n[%s] [%o] end notifying tg (+%o ms)', end.toISOString(), reqId, diff)
    console.log(await res.text())
}
