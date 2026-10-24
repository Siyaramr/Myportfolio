import "./Sidebar.css";

const SYSTEM_INFO = [
  { label: "OS", value: "Arch Linux" },
  { label: "Kernel", value: "x86_64 Linux 6.5.0-arch" },
  { label: "WM", value: "i3 gaps" },
  { label: "Terminal", value: "Alacritty + tmux" },
  { label: "Shell", value: "Zsh + Oh My Zsh" },
  { label: "Languages", value: "Python, Go, Bash" },
] as const;

const GITHUB_URL = "https://github.com/your-username";
const LINKEDIN_URL = "https://www.linkedin.com/in/your-username";
const EMAIL = "you@example.com";

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <polyline points="3 7 12 13.5 21 7" />
    </svg>
  );
}

const LINKS = [
  { label: "GitHub", href: GITHUB_URL, icon: <GithubIcon />, external: true },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: <LinkedinIcon />, external: true },
  { label: "Email", href: `mailto:${EMAIL}`, icon: <MailIcon />, external: false },
] as const;

export default function Sidebar() {
  return (
    <aside className="sb" aria-label="System information">
      <div className="sb__titlebar">
        <span className="sb__prompt">
          <span className="sb__green">sysadmin@arch</span>:~$ <span className="sb__cmd">neofetch</span>
        </span>
      </div>

      <dl className="sb__info">
        {SYSTEM_INFO.map(({ label, value }) => (
          <div key={label} className="sb__row">
            <dt className="sb__label">{label}</dt>
            <dd className="sb__value">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="sb__divider" role="presentation" />

      <ul className="sb__links">
        {LINKS.map(({ label, href, icon, external }) => (
          <li key={label}>
            <a
              className="sb__link"
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
