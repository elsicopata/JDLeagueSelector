import React, { useState } from 'react'
import LeagueSelector from '../components/LeagueSelector'
import SelectFolderButton from '../components/SelectFolderButton'

const CambiarLigaPage = () => {
    const [selectedLeague, setSelectedLeague] = useState<string | null>(null)
    const [fileChecked, setFileChecked] = useState(false)
    const [fileExists, setFileExists] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSelectFolder = async () => {
        setLoading(true)
        setError('')
        setSuccess(false)
        setFileChecked(false)
        setFileExists(false)
        setSelectedLeague(null)
        const result = await window.electronAPI?.selectPesFolder()
        setLoading(false)
        setFileChecked(true)
        if (result?.error) {
            setError(result.error)
            setFileExists(false)
        } else if (result?.fileExists) {
            setFileExists(true)
            setSelectedLeague(result.selected ?? null)
        } else {
            setFileExists(false)
            setError('No se encontró el archivo leagues-map.txt en la carpeta seleccionada.')
        }
    }

    const handleSelectLeague = async (leagueName: string) => {
        setError('')
        setSuccess(false)
        const result = await window.electronAPI?.setSelectedLeague(leagueName)
        if (!result?.error) {
            setSelectedLeague(leagueName)
            setSuccess(true)
        } else {
            setError(result?.error || 'Error al seleccionar la liga.')
        }
    }

    return (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-pes-bg text-pes-text flex flex-col items-center justify-start p-4 overflow-hidden">
            {/* Título siempre centrado arriba */}
            <div className="absolute top-0 left-0 right-0 flex justify-center items-center h-20 pointer-events-none z-10">
                <h2 className="text-4xl font-bold">Seleccionar Liga</h2>
            </div>

            {/* Espacio para el título */}
            <div className="h-20" />

            {/* Botón para seleccionar carpeta */}
            {(!fileChecked && !loading) && (
                <SelectFolderButton onClick={handleSelectFolder} className="mb-8" />
            )}

            {/* Loader tipo spinner */}
            {loading && (
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 border-4 border-pes-border border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span className="text-lg">Verificando carpeta...</span>
                </div>
            )}

            {/* Error si no existe el archivo */}
            {fileChecked && !fileExists && !loading && (
                <div className="flex flex-col items-center mb-4">
                    <div className="text-pes-error font-semibold text-lg mb-4">
                        {error || 'No se encontró el archivo leagues-map.txt en la carpeta seleccionada.'}
                    </div>
                    <SelectFolderButton onClick={handleSelectFolder} className="mb-8" />
                </div>
            )}

            {/* Selector de ligas si existe el archivo */}
            {fileChecked && fileExists && !loading && (
                <>
                    <LeagueSelector selected={selectedLeague} onSelect={handleSelectLeague} />
                    {success && <p className="text-pes-success mt-4">Liga seleccionada correctamente.</p>}
                    {error && <p className="text-pes-error mt-4">{error}</p>}
                </>
            )}
        </div>
    )
}

export default CambiarLigaPage