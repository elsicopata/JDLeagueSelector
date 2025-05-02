import React, { useState, useEffect } from 'react'
import SelectFolderButton from '../components/SelectFolderButton'

const ENTRADA_OPTIONS = [
    '2022 FIFA World Cup Qualifier', 'Brasileirao', 'Bundesliga', 'Catar 2022', 'COPA AMERICA 2024', 'Copa Argentina',
    'Copa De Africa', 'Copa De ASIA 2023', 'Copa sudamericana', 'Default', 'Eredivisie', 'EuroCopa 2024', 'JD PATCH',
    'LaLiga EA SPORTS', 'Liga 1 peru', 'Liga Argentina', 'Liga Betplay 2023 II', 'Liga Chile', 'Liga ECUABET', 'LIGA MX',
    'Liga Turquia', 'Ligue 1', 'MLS', 'Mundial de clubes', 'Premier League', 'Primera Liga Betclic', 'Serie A TIM',
    'Super Lig', 'UEFA Champions League', 'UEFA CONFERENCIA LEAGUE', 'UEFA Europa League'
]

const ENTRADA_FILES = [
    'CINEMATIC ENTRANCE  EXIBITION_217.bin',
    'CINEMATIC ENTRANCE WORLD CUP_216.bin',
    'Efecto de Cinematica_184.bin'
]

const ENTRADA_IMG_PATH = '/Server/User/Entrance/IMG/dt09.img/'

const TABS = [
    { key: 'entrada', label: 'Entrada' },
    { key: 'copas', label: 'Fondo de copas' },
    { key: 'wallpapers', label: 'Wallpapers' }
]

const CambiarFondosPage = () => {
    const [folderPath, setFolderPath] = useState<string | null>(null)
    const [fileChecked, setFileChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [tab, setTab] = useState<'entrada' | 'copas' | 'wallpapers'>('entrada')

    // Entrada
    const [entradaIndex, setEntradaIndex] = useState(0)
    const [previewData, setPreviewData] = useState<{ base64: string, mime: string } | null>(null)
    const [previewLoading, setPreviewLoading] = useState(false)

    // Selección
    const handleSelectFolder = async () => {
        setLoading(true)
        setError('')
        setFileChecked(false)
        setFolderPath(null)
        const result = await window.electronAPI?.selectPesFolder()
        setLoading(false)
        if (result?.error) {
            setError(result.error)
        } else if (result?.fileExists) {
            setFolderPath(result.selectedPath)
            setFileChecked(true)
        } else {
            setError('No se encontró la carpeta seleccionada.')
        }
    }

    // Cargar preview de la opción seleccionada en Entrada
    useEffect(() => {
        if (!folderPath) return
        setPreviewLoading(true)
        setPreviewData(null)
        const option = ENTRADA_OPTIONS[entradaIndex]
        const basePath = `${folderPath}${ENTRADA_IMG_PATH}${option}`
        window.electronAPI?.findPreviewImage?.(basePath).then((data) => {
            setPreviewData(data)
            setPreviewLoading(false)
        })
    }, [folderPath, entradaIndex])

    // Cambiar opción del carrusel
    const handlePrev = () => setEntradaIndex((prev) => (prev === 0 ? ENTRADA_OPTIONS.length - 1 : prev - 1))
    const handleNext = () => setEntradaIndex((prev) => (prev === ENTRADA_OPTIONS.length - 1 ? 0 : prev + 1))

    // Acción de aplicar/cambiar Entrada
    const handleApplyEntrada = async () => {
        if (!folderPath) return
        setLoading(true)
        setError('')
        const option = ENTRADA_OPTIONS[entradaIndex]
        const basePath = folderPath + ENTRADA_IMG_PATH + option
        // Buscar los archivos en la carpeta y subcarpetas
        const result = await window.electronAPI?.replaceEntradaFiles?.(
            basePath,
            folderPath + ENTRADA_IMG_PATH,
            ENTRADA_FILES
        )
        setLoading(false)
        if (result?.error) setError(result.error)
        else alert('¡Entrada aplicada correctamente!')
    }

    return (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-pes-bg text-pes-text flex flex-col items-center justify-start p-4 overflow-hidden">
            {/* Título */}
            <div className="absolute top-0 left-0 right-0 flex justify-center items-center h-20 pointer-events-none z-10">
                <h2 className="text-4xl font-bold">Cambiar Fondos</h2>
            </div>
            <div className="h-20" />

            {/* Botón seleccionar carpeta */}
            {!fileChecked && !loading && (
                <SelectFolderButton onClick={handleSelectFolder} className="mb-8" />
            )}

            {/* Loader */}
            {loading && (
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 border-4 border-pes-border border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span className="text-lg">Procesando...</span>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="text-pes-error font-semibold text-lg mb-4">{error}</div>
            )}

            {/* Tabs y contenido */}
            {fileChecked && !loading && (
                <div className="w-full max-w-2xl flex flex-col items-center">
                    {/* Tabs */}
                    <div className="flex gap-4 mb-8">
                        {TABS.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key as any)}
                                className={`px-6 py-2 rounded-t-lg font-semibold transition border-b-4 ${tab === t.key
                                    ? 'border-pes-primary text-pes-primary'
                                    : 'border-transparent text-pes-textSecondary hover:text-pes-primary'
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Entrada */}
                    {tab === 'entrada' && (
                        <div className="w-full flex flex-col items-center">
                            {/* Carrusel */}
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <button
                                    onClick={handlePrev}
                                    className="p-2 rounded-full bg-pes-card hover:bg-pes-primaryHover transition"
                                    aria-label="Anterior"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <span className="text-xl font-bold min-w-[180px] text-center">{ENTRADA_OPTIONS[entradaIndex]}</span>
                                <button
                                    onClick={handleNext}
                                    className="p-2 rounded-full bg-pes-card hover:bg-pes-primaryHover transition"
                                    aria-label="Siguiente"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            {/* Imagen o nombre */}
                            <div className="w-64 h-40 bg-pes-card rounded-lg flex items-center justify-center mb-6 border-2 border-pes-border overflow-hidden">
                                {previewLoading ? (
                                    <span className="text-pes-textSecondary">Cargando imagen...</span>
                                ) : previewData ? (
                                    <img
                                        src={`data:${previewData.mime};base64,${previewData.base64}`}
                                        alt={ENTRADA_OPTIONS[entradaIndex]}
                                        className="w-full h-full object-fill"
                                    />
                                ) : (
                                    <span className="text-lg text-pes-textSecondary">{ENTRADA_OPTIONS[entradaIndex]}</span>
                                )}
                            </div>
                            <button
                                onClick={handleApplyEntrada}
                                className="px-8 py-3 bg-pes-primary text-pes-text font-bold rounded-lg shadow-md hover:bg-pes-primaryHover transition"
                            >
                                Seleccionar esta Entrada
                            </button>
                        </div>
                    )}

                    {/* Fondo de copas */}
                    {tab === 'copas' && (
                        <div className="w-full flex flex-col items-center">
                            {/* Aquí puedes reutilizar tu CupSelector o lógica similar */}
                            <span className="text-pes-textSecondary">Próximamente: selección de fondo de copas.</span>
                        </div>
                    )}

                    {/* Wallpapers */}
                    {tab === 'wallpapers' && (
                        <div className="w-full flex flex-col items-center">
                            <span className="text-pes-textSecondary">Próximamente: selección de wallpapers.</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CambiarFondosPage