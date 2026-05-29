import type { Metadata } from 'next'
import { AudioProvider } from '@/lib/AudioContext'
import { HertaFloat } from '@/components/ui/HertaFloat'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yumeworld ⋆ ゆめワールド',
  description:
    'A cozy little corner of the internet — part visual novel, part Tokyo midnight, part sakura garden after the rain.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <AudioProvider>
          {children}
          <HertaFloat />
        </AudioProvider>
      </body>
    </html>
  )
}
