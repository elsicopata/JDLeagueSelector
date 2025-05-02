import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/*
        Position relative en <main> para aislar el contenedor.
        pt-16 para que el contenido "descanse" 64px debajo del header.
        overflow-x-hidden para evitar scroll horizontal.
      */}
      <Header />
      <main className="relative min-h-screen pt-16 overflow-x-hidden bg-gray-900">
        <Component {...pageProps} />
      </main>
    </>
  )
}