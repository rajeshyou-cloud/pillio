import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email().max(200),
  phone:   z.string().max(20).optional().default(''),
  service: z.string().min(1).max(100),
  message: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 })
  }

  try {
    const body = await req.json()

    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, service, message } = parsed.data

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    let res: Response
    try {
      res = await fetch(webhookUrl, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          message,
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      })
    } catch (fetchErr) {
      if ((fetchErr as Error).name === 'AbortError') {
        return NextResponse.json({ error: 'Upstream request timed out' }, { status: 504 })
      }
      throw fetchErr
    } finally {
      clearTimeout(timeoutId)
    }

    if (!res.ok) {
      const text = await res.text()
      console.error('Google Sheet webhook error (HTTP', res.status + '):', text)
      return NextResponse.json({ error: 'Failed to save to Google Sheet' }, { status: 502 })
    }

    // Validate response body — Google Apps Script may return 200 with an error in HTML/JSON
    const text = await res.text()
    let result: { result?: string; error?: string } | null = null
    try {
      result = JSON.parse(text)
    } catch {
      // Response is not JSON (e.g. HTML error page from Apps Script)
      if (text.includes('Error') || text.includes('error')) {
        console.error('Google Sheet webhook returned non-JSON error:', text.slice(0, 500))
        return NextResponse.json({ error: 'Failed to save to Google Sheet' }, { status: 502 })
      }
    }

    if (result && result.result === 'error') {
      console.error('Google Sheet webhook returned error:', result.error)
      return NextResponse.json({ error: 'Failed to save to Google Sheet' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
