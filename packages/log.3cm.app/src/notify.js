export async function tg(text, mode, env, locals) {
    const data = {
        chat_id: env.TELEGRAM_CHAT_ID,
        text
    }
    if (mode) {
        data.parse_mode = mode
    }
    console.log('tg', data, locals)
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetch(url, options)
    console.log('tg res', await res.text(), locals)
}
