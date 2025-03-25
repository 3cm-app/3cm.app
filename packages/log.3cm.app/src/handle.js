import { tg } from './notify.js'

async function handleGoogleAlerts(id, req, text, env) {
    const parsed = JSON.parse(text)
    const msg = '```json\n'+ JSON.stringify({
        policy_name: parsed?.incident?.policy_name,
        resource: parsed?.incident?.resource
    }) + '\n```'
    await tg(id, msg, 'MarkdownV2', env)
}

function getHeader(req, key) {
    // fetch headers interface
    if (typeof req.headers.get === 'function') {
        return req.headers.get(key)
    }
    // nodejs request
    return req.headers[key]
}
function detectFrom(req) {
    if (getHeader(req, 'user-agent') === 'Google-Alerts') {
        return 'google-alerts'
    }
}

// TODO: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
export async function handleRequest(id, req, text, env) {
    switch (detectFrom(req)) {
        case 'google-alerts': {
            return handleGoogleAlerts(id, req, text, env)
        }
    }
    console.log('receive', text)
    console.error('[%s] [%o] skip handling request', (new Date).toISOString(), id)
}