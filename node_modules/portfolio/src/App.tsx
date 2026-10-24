import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import { Home } from './sections/Home.tsx'
import { About } from './sections/About.tsx'
import { Experience } from './sections/Experience.tsx'
import { Skills } from './sections/Skills.tsx'
import { Projects } from './sections/project.tsx'
import { Contact } from './sections/contact.tsx'

function App() {
  const [isLightTheme, setIsLightTheme] = useState(
    () => localStorage.getItem('portfolio-theme') === 'light',
  )

  useEffect(() => {
    const theme = isLightTheme ? 'light' : 'dark'
    document.body.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [isLightTheme])

  return (
    <>
      <Header isLightTheme={isLightTheme} onThemeToggle={() => setIsLightTheme(!isLightTheme)} />
      <Home />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <a className="sudo-button" href="#home" aria-label="Back to home">
        sudo !!
      </a>
    </>
  )
}

export default App
