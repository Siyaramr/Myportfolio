import type { FormEvent } from 'react'

const CONTACT_EMAIL = 'ranasiyaram6194@gmail.com'

export const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name'))
    const email = String(formData.get('email'))
    const subject = String(formData.get('subject'))
    const message = String(formData.get('message'))
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__heading">
        <p className="contact-section__eyebrow">### ./send_message.sh</p>
        <h2>Connect</h2>
        <p>Have a project or opportunity in mind? Send me a message.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
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

        <button className="contact-form__submit" type="submit">
          <span aria-hidden="true">$</span> ./send_message.sh
        </button>
      </form>

      <p className="contact-section__note">
        Submitting opens your email app with the message ready to send.
      </p>
    </section>
  )
}
