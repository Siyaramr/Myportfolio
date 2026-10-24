const SKILL_GROUPS = [
  {
    title: 'Networking and Connectivity',
    skills: [
      'TCP/IP, DNS, and DHCP fundamentals',
      'LAN, Wi-Fi, and internet connectivity troubleshooting',
      'Router and ONU configuration, basic PPPoE',
      'Wi-Fi channels, bandwidth, and optical-related issue investigation',
    ],
  },
  {
    title: 'IPTV Support',
    skills: [
      'IPTV troubleshooting and customer support',
      'Set-top box configuration and testing',
      'IPTV STB firmware upgrades and downgrades',
    ],
  },
  {
    title: 'ERP, FinTech, and Software',
    skills: [
      'ERP and FinTech software support',
      'BUSY accounting software and SQL queries',
      'Software installation and configuration',
      'User issue troubleshooting',
    ],
  },
  {
    title: 'Technical Support',
    skills: [
      'L1 technical and customer support',
      'On-site diagnosis and troubleshooting',
      'Clear client communication and issue escalation',
      'Red Hat Enterprise Linux (learning), preparing for RHCSA',
    ],
  },
]

export const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-section__heading">
        <p className="skills-section__eyebrow">### ./skills.conf</p>
        <h2>Skills</h2>
      </div>

      <div className="skills-grid">
        {SKILL_GROUPS.map(({ title, skills }) => (
          <article className="skills-card" key={title}>
            <h3>{title}</h3>
            <ul>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}