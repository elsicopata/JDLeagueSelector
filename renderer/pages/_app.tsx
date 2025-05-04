import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TitleBar from '../components/TitleBar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="relative flex flex-col overflow-x-hidden bg-transparent min-h-screen rounded-xl app-border-glow">
        <TitleBar />
        <Component {...pageProps} />
      </main>
    </>
  )
}