import { tg } from './notify.js'

async function handleGoogleAlerts(id, req, text, env) {
    const parsed = JSON.parse(text)
    const msg = '```json\n'+ JSON.stringify({
        policy_name: parsed.incident.policy_name,
        resource: parsed.incident.resource
    }) + '\n```'
    await tg(id, msg, 'MarkdownV2', env)
}

// TODO: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
export default async function handleRequest(id, req, text, env) {
    if (req.headers['user-agent'] === 'Google-Alerts') {
        await handleGoogleAlerts(id, req, text, env)
    } else {
        console.error('[%s] [%o] skip handling request', (new Date).toISOString(), id)
    }
}