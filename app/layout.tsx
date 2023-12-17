import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {NextUIProvider} from "@nextui-org/react"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "splitscreen-video",
  description: "splitscreen video player",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='dark text-foreground bg-background'>{children}</main>
      </body>
    </html>
  )
}
