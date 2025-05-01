import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import LeagueSelector from '../components/LeagueSelector'

export default function HomePage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fileFound, setFileFound] = useState(false)
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null)

  useEffect(() => {
    setLoading(false)
    setError('')
    setFileFound(false)
    setSelectedLeague(null)
  }, [])

  const handleSelectFolder = async () => {
    setLoading(true)
    setError('')
    setFileFound(false)

    const result = await window.electronAPI?.selectPesFolder()

    if (result?.error) {
      setError(result.error)
    } else if (result?.fileExists) {
      setFileFound(true)
      setSelectedLeague(result.selected ?? null)
    } else {
      setError('El archivo leagues-map.txt no fue encontrado.')
    }

    setLoading(false)
  }

  const handleSelectLeague = async (leagueName: string) => {
    const result = await window.electronAPI?.setSelectedLeague(leagueName)
    if (!result?.error) {
      setSelectedLeague(leagueName)
    } else {
      setError(result.error)
    }
  }

  return (
    <>
      <Head>
        <title>PES 2013 League Selector By Sic0</title>
      </Head>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start py-12 px-4">
        {!fileFound && (
          <button
            onClick={handleSelectFolder}
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500 transition mb-6"
          >
            Seleccionar carpeta contenedora de JD PATCH
          </button>
        )}

        {loading && <p className="text-lg">Verificando carpeta...</p>}

        {error && (
          <p className="text-red-400 mb-4 font-semibold">{error}</p>
        )}

        {fileFound && (
          <>
            <h2 className="text-4xl font-bold mb-8">Selecciona una Liga</h2>
            <LeagueSelector
              selected={selectedLeague}
              onSelect={handleSelectLeague}
            />
          </>
        )}
        <h2 className="text-sm text-red-600 mt-8 font-semibold absolute bottom-0 right-0 p-4">
          Hecho por Sic0 para la comunidad de JD PATCH
        </h2>
      </div>
    </>
  )
}
