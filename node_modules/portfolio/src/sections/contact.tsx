import type { FormEvent } from 'react'
import { useState } from 'react'

const configuredApiUrl = (import.meta.env.VITE_API_URL ?? '').trim()
const API_URL = (
  configuredApiUrl ||
  (import.meta.env.DEV
    ? 'http://127.0.0.1:8000'
    : 'https://myportfoliob-six.vercel.app')
).replace(/\/+$/, '')
const CONTACT_EMAIL = 'ranasiyaram6194@gmail.com'
const REQUEST_TIMEOUT_MS = 60_000
const WAKEUP_NOTICE_DELAY_MS = 3_000
const WAKEUP_NOTICE = 'The server may be waking up, please wait up to a minute'

type ContactStatus =
  | { type: 'idle'; message: string }
  | { type: 'loading'; message: string }
  | { type: 'notice'; message: string }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

export const Contact = () => {
  const [status, setStatus] = useState<ContactStatus>({
    type: 'idle',
    message: '',
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status.type === 'loading') return

    const form = event.currentTarget
    const formData = new FormData(form)
    if (!API_URL) {
      const subject = String(formData.get('subject') ?? '')
      const body = [
        `Name: ${String(formData.get('name') ?? '')}`,
        `Email: ${String(formData.get('email') ?? '')}`,
        '',
        String(formData.get('message') ?? ''),
      ].join('\n')
      const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      setStatus({
        type: 'notice',
        message:
          'Your email app should open with your message. Review and send it there. If it does not open, email ' +
          CONTACT_EMAIL,
      })
      window.location.href = mailtoUrl
      return
    }

    setStatus({ type: 'loading', message: 'Sending your message...' })

    const url = `${API_URL}/api/contact`
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    const wakeupNoticeId = window.setTimeout(() => {
      setStatus({ type: 'loading', message: WAKEUP_NOTICE })
    }, WAKEUP_NOTICE_DELAY_MS)
    let responseStatus: number | undefined
    let result: { detail?: unknown; message?: unknown } = {}

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        signal: controller.signal,
      })
      responseStatus = response.status

      try {
        result = (await response.json()) as typeof result
      } catch {
        if (response.ok) {
          throw new Error('The server returned an invalid response. Please try again.')
        }
      }

      if (!response.ok) {
        throw new Error(
          responseStatus === 429
            ? 'Too many messages were sent. Please wait a minute and try again.'
            : responseStatus === 422
              ? 'Please check the name, email, and message fields and try again.'
              : responseStatus >= 500
                ? 'The server encountered an error. Please try again later.'
                : typeof result.detail === 'string'
                  ? result.detail
                  : 'The message could not be sent. Please try again.',
        )
      }

      setStatus({
        type: 'success',
        message:
          typeof result.message === 'string' ? result.message : 'Your message has been sent.',
      })
      form.reset()
    } catch (error) {
      console.error('Contact form request failed', {
        url,
        error,
        status: responseStatus,
        response: result,
      })
      setStatus({
        type: 'error',
        message:
          responseStatus === 429
            ? 'Too many messages were sent. Please wait a minute and try again.'
            : responseStatus === 422
              ? 'Please check the name, email, and message fields and try again.'
              : responseStatus !== undefined && responseStatus >= 500
                ? 'The server encountered an error. Please try again later.'
              : error instanceof DOMException && error.name === 'AbortError'
                ? 'The request timed out. The server may be waking up; please try again.'
                : error instanceof TypeError
                  ? import.meta.env.DEV
                    ? 'The local contact backend is not responding. Start it at http://localhost:8000, then try again.'
                    : 'Could not reach the contact backend. Check VITE_API_URL and the backend CORS configuration.'
                  : error instanceof Error
                    ? error.message
                    : 'The message could not be sent. Please try again.',
      })
    } finally {
      window.clearTimeout(timeoutId)
      window.clearTimeout(wakeupNoticeId)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__heading">
        <p className="contact-section__eyebrow">### ./send_message.sh</p>
        <h2>Connect</h2>
        <p>Have a project or opportunity in mind? Send me a message.</p>
      </div>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        aria-busy={status.type === 'loading'}
      >
        <div className="contact-form__field">
          <label htmlFor="contact-name">NAME</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-email">EMAIL</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-subject">SUBJECT</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="What would you like to discuss?"
            required
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-message">MESSAGE</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Write your message here..."
            required
          />
        </div>

        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: 'none' }}
        />

        <button
          className="contact-form__submit"
          type="submit"
          disabled={status.type === 'loading'}
        >
          <span aria-hidden="true">$</span>{' '}
          {status.type === 'loading' ? 'sending...' : './send_message.sh'}
        </button>
      </form>

      {status.message && (
        <p
          className={`contact-section__note contact-section__note--${status.type}`}
          role={status.type === 'error' ? 'alert' : 'status'}
          aria-live={status.type === 'error' ? 'assertive' : 'polite'}
        >
          {status.message}
        </p>
      )}
    </section>
  )
}
