import type { Metadata } from 'next'
import {
  Zen_Maru_Gothic,
  Shippori_Mincho,
  DotGothic16,
  Press_Start_2P,
} from 'next/font/google'
import './globals.css'

const kawaii = Zen_Maru_Gothic({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-kawaii',
  display: 'swap',
})

const serif = Shippori_Mincho({
  weight: ['500', '700', '800'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const pixel = DotGothic16({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

const arcade = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-arcade',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yumeworld ⋆ ゆめワールド',
  description:
    'A cozy little corner of the internet — part visual novel, part Tokyo midnight, part sakura garden after the rain.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${kawaii.variable} ${serif.variable} ${pixel.variable} ${arcade.variable}`}
    >
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}