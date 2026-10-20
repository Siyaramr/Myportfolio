type HeaderProps = {
  isLightTheme: boolean
  onThemeToggle: () => void
}

export default function Header({ isLightTheme, onThemeToggle }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__identity">
        <a className="site-header__brand" href="#home">
          Siyaram Rana
        </a>
        <button
          className="theme-toggle"
          type="button"
          onClick={onThemeToggle}
          aria-label={`Switch to ${isLightTheme ? 'dark' : 'light'} theme`}
          aria-pressed={isLightTheme}
          title={`Switch to ${isLightTheme ? 'dark' : 'light'} theme`}
        >
          {isLightTheme ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
          )}
        </button>
      </div>
      <nav className="site-header__nav" aria-label="Main navigation">
        <a href="#about">about</a>
        <a href="#experience">experience</a>
        <a href="#skills">skills</a>
        <a href="#projects">projects</a>
        <a href="#contact">contact</a>
      </nav>
    </header>
  )
}
