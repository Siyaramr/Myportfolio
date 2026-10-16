const SKILL_GROUPS = [
  {
    title: 'Networking',
    skills: ['TCP/IP, DNS, DHCP', 'LAN and Wi-Fi troubleshooting', 'Router and ONU setup, PPPoE'],
  },
  {
    title: 'System Administration (learning)',
    skills: ['Linux (Red Hat Enterprise Linux)', 'Windows support', 'Preparing for RHCSA'],
  },
  {
    title: 'Support and Software',
    skills: [
      'Technical and customer support',
      'Software installation and setup',
      'Troubleshooting hardware and software',
      'ERP software, SQL basics',
    ],
  },
  {
    title: 'Other',
    skills: ['Website building', 'Clear communication with customers', 'Problem solving'],
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