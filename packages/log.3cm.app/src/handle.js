import { tg } from './notify.js'

async function handleGoogleAlerts(req, text, env, locals) {
    const parsed = JSON.parse(text)
    const msg = '```json\n'+ JSON.stringify({
        policy_name: parsed?.incident?.policy_name,
        resource: parsed?.incident?.resource
    }) + '\n```'
    await tg(msg, 'MarkdownV2', env)
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
export async function handleRequest(req, text, env, locals) {
    switch (detectFrom(req)) {
        case 'google-alerts': {
            return handleGoogleAlerts(req, text, env, locals)
        }
    }
    console.log('receive', text)
    console.error('skip handling request', locals)
}