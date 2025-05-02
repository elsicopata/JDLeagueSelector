import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const opciones = [
  {
    name: 'Cambiar Liga',
    description: 'Selecciona la liga que quieres activar en el parche.',
    image: '/images/seleccionLiga.webp',
    href: '/cambiarLiga',
    alt: 'Cambiar Liga'
  },
  {
    name: 'Cambiar Fondos',
    description: 'Selecciona los fondos que quieres usar.',
    image: '/images/seleccionFondo.webp',
    href: '/cambiarFondos',
    alt: 'Cambiar Fondos'
  }
]

export default function HomePage() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>PES 2013 Selector - By Sic0</title>
      </Head>
      <div className="fixed top-16 left-0 right-0 bottom-0 bg-pes-bg text-pes-text flex flex-col items-center justify-center px-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {opciones.map((opcion) => (
            <div
              key={opcion.name}
              onClick={() => router.push(opcion.href)}
              className="w-72 h-80 bg-pes-card rounded-lg shadow-lg cursor-pointer flex flex-col transition border-2 border-transparent hover:border-pes-border hover:shadow-lg"
            >
              {/* Imagen ocupa la mitad superior, se deforma para rellenar */}
              <div className="w-full h-2/4 rounded-t-lg overflow-hidden">
                <img
                  src={opcion.image}
                  alt={opcion.alt}
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center p-4">
                <h3 className="text-2xl font-bold mb-2 text-center">{opcion.name}</h3>
                <p className="text-center text-pes-textSecondary">{opcion.description}</p>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-base font-semibold absolute bottom-0 right-0 p-4 flex items-center gap-2 drop-shadow-lg select-none">
          <span className="text-pes-textSecondary">Hecho por</span>
          <span
            className="font-bold bg-gradient-to-r from-sky-400 via-white to-sky-400 bg-clip-text text-transparent px-1"
            style={{ letterSpacing: '1px' }}
          >
            Sic0
          </span>
          <span className="text-pes-textSecondary">para la comunidad de JD PATCH</span>
          <span className="ml-1 animate-pulse text-red-500 text-lg">❤️</span>
        </h2>
      </div>
    </>
  )
}