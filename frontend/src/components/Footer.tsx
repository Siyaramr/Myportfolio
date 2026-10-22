const LINKEDIN_URL = 'https://www.linkedin.com/in/siyaram-rana-14aa46312'
const CONTACT_EMAIL = 'ranasiyaram6194@gmail.com'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__identity">
          <a className="site-footer__name" href="#home">
            Siyaram Rana
          </a>
          <a className="site-footer__contact-link" href={`mailto:${CONTACT_EMAIL}`}>
            <svg className="site-footer__contact-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.75 5.75h16.5v12.5H3.75z" />
              <path d="m4.25 6.5 7.75 6 7.75-6" />
            </svg>
            {CONTACT_EMAIL}
          </a>
          <a
            className="site-footer__contact-link"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="site-footer__contact-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5.5 8.5v10m0-13v.1M10 18.5v-6a3 3 0 0 1 6 0v6m0-6a3 3 0 0 1 6 0v6" />
              <path d="M3.5 3.5h17v17h-17z" />
            </svg>
            linkedin.com/in/siyaram-rana-14aa46312
          </a>
        </div>

        <nav className="site-footer__group" aria-label="Experience">
          <h2>Experiences</h2>
          <a href="#experience">View experience</a>
        </nav>

        <nav className="site-footer__group" aria-label="Footer menu">
          <h2>Menu</h2>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <p>© Copyright 2026 Siyaram Rana. All Rights Reserved</p>
      </div>
    </footer>
  )
}
