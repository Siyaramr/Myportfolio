export const Home = () => {
  const systemInfo = [
    ['OS', 'Red Hat Enterprise Linux / Kali Linux'],
    ['Kernel', 'Linux x86_64'],
    ['VM', 'VMware Workstation'],
    ['Terminal', 'Kali Linux terminal'],
    ['Shell', 'Bash / Zsh'],
    ['Focus', 'System administration, cybersecurity'],
  ]

  return (
    <section id="home" className="home-section">
      <div className="home-section__intro">
        <p className="home-section__shebang">#! /bin/sysadmin</p>
        <p className="home-section__command">
          <span>[root@portfolio]$</span> whoami
        </p>
        <h1>Siyaram Rana</h1>
        <p className="home-section__role">
          IT Support Professional | Aspiring System Administrator &amp; Cyber Security Learner
        </p>
        <p className="home-section__summary">
          I help people solve technical problems. I am building my skills in Linux, networking, and
          security to become a System Administrator.
        </p>
        <div className="home-section__actions">
          <a className="home-button home-button--primary" href="#contact">
            ** Contact Me
          </a>
          <a className="home-button home-button--secondary" href="#projects">
            ** View Projects
          </a>
        </div>
      </div>

      <div className="neofetch" aria-label="System information">
        <div className="neofetch__titlebar">
          <span className="neofetch__dot" />
          <span className="neofetch__dot" />
          <span className="neofetch__dot" />
          <span className="neofetch__title">root@portfolio: /root</span>
        </div>
        <div className="neofetch__body">
          <p className="neofetch__command">
            <span>root@portfolio:~#</span> cat /etc/os-release
          </p>
          <dl className="neofetch__info">
            {systemInfo.map(([label, value]) => (
              <div className="neofetch__row" key={label}>
                <dt>{label}:</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}