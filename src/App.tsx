import './App.css'

import NavBar from './components/navbar'
import { Home, User, FolderGit2, Briefcase } from 'lucide-react'
import CreatorProfile from './components/profile/ProfileCard.tsx'
import StackGrid from './components/StackGrid/StackGrid.tsx'
import Projects from './components/CardHoverEffectDemo/Projects.tsx'

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Sobre', url: '/sobre', icon: User },
  { name: 'Projectos', url: '/projectos', icon: FolderGit2 },
  { name: 'Experiência', url: '/experiencia', icon: Briefcase },
]

function App() {

  return (
    <>
      <NavBar items={navItems}></NavBar>
      <main className='min-h-screen flex-col items-center justify-center px-4'>
        <CreatorProfile/>
        <StackGrid/>
        <Projects/>
      </main>
    </>
  )
}

export default App
