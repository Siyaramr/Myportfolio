const EXPERIENCE = [
  {
    role: 'Information Technology Support Officer',
    company: 'Lele Ventures Pvt Ltd',
    companyUrl: 'https://leleventures.com/',
    dates: 'Jul 2026 – Present',
    location: 'Kupondole, Lalitpur, Nepal · On-site',
    responsibilities: [
      'Provide software support and technical assistance to customers and clients.',
      'Assist with software installation, configuration, and user issue troubleshooting.',
      'Learn and support ERP and FinTech software solutions.',
      'Work with SQL queries in BUSY accounting software.',
    ],
  },
  {
    role: 'L1 Technical Support / Field Specialist',
    company: 'Vianet Communication',
    companyUrl: 'https://www.vianet.com.np/',
    dates: 'May 2025 – Jun 2026',
    location: 'Dhangadhi, Seti, Nepal · On-site',
    responsibilities: [
      'Provided L1 technical support for internet connectivity and IPTV issues.',
      'Troubleshot LAN, Wi-Fi, and network connectivity at customer locations.',
      'Configured ONUs and routers; handled basic PPPoE troubleshooting.',
      'Investigated connectivity and optical-related issues using TCP/IP, DNS, and DHCP concepts.',
      'Checked Wi-Fi configuration, channels, bandwidth, and connectivity.',
      'Upgraded and downgraded IPTV set-top box firmware, configured devices, and tested after updates.',
      'Assisted customers with network device configuration and escalated complex issues to the right teams.',
      'Kept customers informed throughout troubleshooting and service resolution.',
    ],
  },
]

export const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-section__heading">
        <p className="experience-section__eyebrow">### ./experience.log</p>
        <h2>Experience</h2>
      </div>

      <div className="experience-list">
        {EXPERIENCE.map(({ role, company, companyUrl, dates, location, responsibilities }) => (
          <article className="experience-card" key={company}>
            <header className="experience-card__header">
              <div>
                <h3>{role}</h3>
                <p className="experience-card__company">
                  {companyUrl ? (
                    <a href={companyUrl} target="_blank" rel="noreferrer">
                      {company}
                    </a>
                  ) : (
                    company
                  )}
                </p>
              </div>
              <p className="experience-card__meta">
                <span>{dates}</span>
                <span>{location}</span>
              </p>
            </header>
            <ul>
              {responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
