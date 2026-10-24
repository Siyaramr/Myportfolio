const PROJECTS = [
  {
    title: 'RHEL Server Hardening',
    description: 'Demo project exploring baseline hardening workflows for a RHEL server.',
  },
  {
    title: 'Kali Linux Security Audit',
    description: 'Demo project outlining a security audit workflow in a controlled lab.',
  },
  {
    title: 'Linux Network Monitoring',
    description: 'Demo project for observing Linux host and network activity.',
  },
  {
    title: 'Web Application Security Lab',
    description: 'Demo project for practicing web application security checks in a safe lab.',
  },
]

export const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-section__heading">
        <p className="projects-section__eyebrow">### ls -la ~/projects/</p>
        <h2>Projects</h2>
      </div>

      <div className="projects-grid">
        {PROJECTS.map(({ title, description }) => (
          <article className="project-card" key={title}>
            <div className="project-card__heading">
              <h3>{title}</h3>
              <span className="project-card__label">Demo</span>
            </div>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
