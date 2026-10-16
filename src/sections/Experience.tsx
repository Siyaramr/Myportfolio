const EXPERIENCE = [
  {
    role: 'Information Technology Support Officer',
    company: 'Lele Ventures Pvt Ltd',
    dates: 'Jul 2026 – Present',
    location: 'Kupondole, Lalitpur',
    responsibilities: [
      'Give software support to customers',
      'Help with software installation and setup',
      'Fix user problems',
      'Learn ERP and FinTech software',
      'Work with SQL queries',
      'Talk with clients and give clear technical help',
    ],
  },
  {
    role: 'L1 Technical Support / Field Specialist',
    company: 'Vianet Communication',
    dates: 'May 2025 – Jun 2026',
    location: 'Dhangadhi, Nepal',
    responsibilities: [
      'Gave first-level support for internet and IPTV problems',
      'Fixed LAN, Wi-Fi, and basic network problems',
      'Checked and fixed network problems at customer locations',
      'Set up ONU and routers, and fixed basic PPPoE problems',
      'Used TCP/IP, DNS, and DHCP knowledge to find faults',
      'Checked Wi-Fi settings, channels, and speed',
      'Passed difficult problems to the right technical team',
      'Upgraded and set up IPTV set-top boxes (STB)',
      'Kept customers informed until the problem was solved',
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
        {EXPERIENCE.map(({ role, company, dates, location, responsibilities }) => (
          <article className="experience-card" key={company}>
            <header className="experience-card__header">
              <div>
                <h3>{role}</h3>
                <p className="experience-card__company">{company}</p>
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
