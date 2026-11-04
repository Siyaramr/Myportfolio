const SKILL_GROUPS = [
  {
    title: 'Networking and Connectivity',
    skills: [
      'TCP/IP, DNS, DHCP, LAN/WAN, Wi-Fi, routers, and switches',
      'Internet connectivity troubleshooting and PPPoE',
      'ONU and router configuration',
      'Wi-Fi channel and bandwidth optimization, optical fault investigation',
    ],
  },
  {
    title: 'IT Support and System Administration',
    skills: [
      'Hardware and software troubleshooting, remote support',
      'Windows installation and configuration, user account and access management',
      'Patch management, data backup and recovery',
      'Antivirus deployment, IT asset management',
    ],
  },
  {
    title: 'Linux and Cybersecurity (Learning)',
    skills: [
      'Red Hat Enterprise Linux (RHEL), preparing for RHCSA',
      'Cybersecurity best practices, security patching',
    ],
  },
  {
    title: 'ERP, FinTech, and Software',
    skills: [
      'ERP and FinTech software support',
      'BUSY accounting software, SQL queries',
      'Software installation, configuration, and troubleshooting',
    ],
  },
  {
    title: 'IPTV and Customer Support',
    skills: [
      'IPTV troubleshooting, set-top box configuration and firmware upgrade/downgrade',
      'L1/L2 technical support, on-site diagnosis',
      'Clear client communication, issue escalation, documentation',
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