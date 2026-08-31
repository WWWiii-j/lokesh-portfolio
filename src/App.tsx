import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Hackathon } from './components/Hackathon'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { BackgroundScrub } from './components/BackgroundScrub'

function App() {
  return (
    <>
      <BackgroundScrub />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Hackathon />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
