import type { FormEvent } from 'react'
import { useState } from 'react'

const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://myportfolio-backend01.vercel.app'
    : 'http://127.0.0.1:8001')
).replace(/\/+$/, '')

type ContactStatus =
  | { type: 'idle'; message: string }
  | { type: 'loading'; message: string }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

export const Contact = () => {
  const [status, setStatus] = useState<ContactStatus>({
    type: 'idle',
    message: 'Your message will be sent securely.',
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status.type === 'loading') return

    setStatus({ type: 'loading', message: 'Sending your message...' })

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      let result: { detail?: unknown; message?: unknown } = {}

      try {
        result = (await response.json()) as typeof result
      } catch {
        if (response.ok) {
          throw new Error('The server returned an invalid response. Please try again.')
        }
      }

      if (!response.ok) {
        throw new Error(
          typeof result.detail === 'string'
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
      setStatus({
        type: 'error',
        message:
          error instanceof TypeError
            ? 'Could not connect to the server. Please try again later.'
            : error instanceof Error
              ? error.message
              : 'The message could not be sent. Please try again.',
      })
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

      <p
        className={`contact-section__note contact-section__note--${status.type}`}
        role={status.type === 'error' ? 'alert' : 'status'}
        aria-live={status.type === 'error' ? 'assertive' : 'polite'}
      >
        {status.message}
      </p>
    </section>
  )
}
