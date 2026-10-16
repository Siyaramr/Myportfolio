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
            📧 {CONTACT_EMAIL}
          </a>
          <a
            className="site-footer__contact-link"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            💼 linkedin.com/in/siyaram-rana-14aa46312
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
