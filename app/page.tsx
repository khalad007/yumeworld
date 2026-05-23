import { Topbar } from '@/components/layout/Topbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/Customcursor'
import { SakuraPetals } from '@/components/ui/SakuraPetals'
import { Notifications } from '@/components/ui/Notifications'
import { Hero } from '@/components/sections/Hero'
import { WorldZone } from '@/components/sections/WorldZone'
import { MusicZone } from '@/components/sections/MusicZone'
import { CharactersZone } from '@/components/sections/CharactersZone'
import { FunZone } from '@/components/sections/FunZone'
import { Ending } from '@/components/sections/Ending'

export default function Home() {
  return (
    <>
      {/* Global overlays */}
      <CustomCursor />
      <SakuraPetals />
      <Notifications />

      {/* Layout */}
      <Topbar />

      <main>
        <Hero />
        <WorldZone />
        <MusicZone />
        <CharactersZone />
        <FunZone />
        <Ending />
      </main>

      <Footer />
    </>
  )
}