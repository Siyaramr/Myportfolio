const EXPERIENCE = [
  {
    role: 'IT Support Engineer',
    company: 'IT Linx Pvt. Ltd.',
    employmentType: 'Full-time',
    dates: 'Oct 28, 2026 – Present',
    location: '',
    responsibilities: [
      'Diagnose and resolve hardware, software, and network issues across the organization, minimizing downtime and keeping business operations running.',
      'Provide Level 1 and Level 2 technical support to end users through phone, email, remote access tools, and on-site visits.',
      'Install, configure, and maintain desktops, laptops, printers, and other IT equipment.',
      'Manage and troubleshoot LAN/WAN, Wi-Fi, routers, and switches to keep the network stable and secure.',
      'Administer user accounts, access permissions, and email accounts following the principle of least privilege.',
      'Perform operating system updates, security patching, and routine preventive maintenance.',
      'Monitor system and network performance and proactively resolve issues before they affect users.',
      'Run scheduled data backups and support disaster recovery procedures to protect business data.',
      'Deploy and manage antivirus solutions and apply cybersecurity best practices.',
      'Maintain the IT asset inventory and document incidents and resolutions to build a reusable knowledge base.',
      'Onboard new employees by preparing workstations, accounts, and required software.',
      'Coordinate with vendors for repairs, warranty claims, and software licensing.',
    ],
  },
  {
    role: 'Information Technology Support Officer',
    company: 'Lele Ventures Pvt Ltd',
    companyUrl: 'https://leleventures.com/',
    dates: 'Jul 2026 – Oct 20, 2026',
    location: 'Kupondole, Lalitpur, Nepal · On-site',
    responsibilities: [
      'Delivered software support and technical assistance to customers and clients, resolving issues on time and communicating clearly.',
      'Installed and configured software and troubleshot user issues on-site and remotely.',
      'Supported ERP and FinTech software solutions, quickly learning the business workflows behind them.',
      'Wrote and ran SQL queries in BUSY accounting software to retrieve, verify, and correct data.',
    ],
  },
  {
    role: 'L1 Technical Support / Field Specialist',
    company: 'Vianet Communication',
    companyUrl: 'https://www.vianet.com.np/',
    dates: 'May 2025 – Jun 2026',
    location: 'Dhangadhi, Seti, Nepal · On-site',
    responsibilities: [
      'Delivered L1 technical support for internet connectivity and IPTV services.',
      'Troubleshot LAN, Wi-Fi, and network connectivity issues at customer locations, restoring service on the first visit wherever possible.',
      'Configured ONUs and routers and resolved basic PPPoE authentication and connection problems.',
      'Diagnosed connectivity and optical-related faults using TCP/IP, DNS, and DHCP knowledge.',
      'Optimized Wi-Fi performance by checking configuration, channel selection, bandwidth, and signal coverage.',
      'Upgraded and downgraded IPTV set-top box firmware, configured devices, and tested them after updates.',
      'Guided customers through network device setup and escalated complex issues to the right technical teams with clear documentation.',
      'Kept customers informed throughout troubleshooting until the service was fully resolved.',
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
        {EXPERIENCE.map(({ role, company, companyUrl, employmentType, dates, location, responsibilities }) => (
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
                {employmentType && <span>{employmentType}</span>}
                <span>{dates}</span>
                {location && <span>{location}</span>}
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
