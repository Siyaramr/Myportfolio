export default function Header() {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="#home">
        Siyaram Rana
      </a>
      <nav className="site-header__nav" aria-label="Main navigation">
        <a href="#about">about.man</a>
        <a href="#experience">experience</a>
        <a href="#skills">skills</a>
        <a href="#projects">projects</a>
        <a href="#contact">contact</a>
      </nav>
    </header>
  )
}
