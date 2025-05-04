import React, { useState, useEffect, useMemo } from 'react'
import SelectFolderButton from '../components/SelectFolderButton'
import Image from 'next/image'

const ENTRADA_OPTIONS = [
    '2022 FIFA World Cup Qualifier', 'Brasileirao', 'Bundesliga', 'Catar 2022', 'COPA AMERICA 2024', 'Copa Argentina',
    'Copa De Africa', 'Copa De ASIA 2023', 'Copa sudamericana', 'Default', 'Eredivisie', 'EuroCopa 2024', 'JD PATCH',
    'LaLiga EA SPORTS', 'Liga 1 peru', 'Liga Argentina', 'Liga Betplay 2023 II', 'Liga Chile', 'Liga ECUABET', 'LIGA MX',
    'Liga Turquia', 'Ligue 1', 'MLS', 'Mundial de clubes', 'Premier League', 'Primera Liga Betclic', 'Serie A TIM',
    'Super Lig', 'UEFA Champions League', 'UEFA CONFERENCIA LEAGUE', 'UEFA Europa League'
]

const COPAS_OPTIONS = [
    'Copa Africana 2023', 'Copa America 2024', 'Copa Asiatica 2023', 'Copa Mundial 2026',
    'Copa Sudamericana 2024', 'Default', 'EuroCopa 2024', 'Mundial de clubes',
    'Mundial de clubes 2025', 'UEFA CONFECENCIA LEAGUE'
]

const WALLPAPER_OPTIONS = [
    'Brasileirao', 'Bundesliga', 'Copa Africana', 'Copa America 2024', 'Copa Asia', 'Copa Sudamericana', 'Defaul',
    'Eredivisie', 'Eurocopa 2024', 'LaLiga', 'Liga 1 peru', 'Liga Argentina', 'Liga betclic de portugal', 'Liga Betplay',
    'Liga de chile', 'LIGA MX', 'Liga Turquia', 'Ligue 1', 'MLS', 'Mundial de clubes', 'Mundial de Clubes 2025',
    'Premier league', 'Qualifer 2026', 'Serie A italia', 'UEFA CONFERENCE LEAGUE', 'UEL', 'USC'
]

const ENTRADA_FILES = [
    'CINEMATIC ENTRANCE  EXIBITION_217.bin',
    'CINEMATIC ENTRANCE WORLD CUP_216.bin',
    'Efecto de Cinematica_184.bin'
]

const COPAS_FILE = ['imagen para las copas_787.bin']

const WALLPAPER_FILES = [
    'Copa Libertadores_69.bin', 'Europa League_67.bin', 'Home_78.bin', 'Match_68.bin'
]

const ENTRADA_IMG_PATH = '/Server/User/Entrance/IMG/dt09.img/'
const COPAS_IMG_PATH = '/Server/User/Fondo de copas/IMG/dt06.img/'
const WALLPAPER_IMG_PATH = '/Server/User/Wallpapers/IMG/dt06.img/'

const TABS = [
    { key: 'entrada', label: 'Entrada' },
    { key: 'copas', label: 'Fondo de copas' },
    { key: 'wallpapers', label: 'Wallpapers' }
]

const TITLEBAR_HEIGHT = 40 // h-10 = 40px

const preloadImage = (src: string) => {
    if (!src) return
    const img = new window.Image()
    img.src = src
}

const CambiarFondosPage = () => {
    const [folderPath, setFolderPath] = useState<string | null>(null)
    const [fileChecked, setFileChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [tab, setTab] = useState<'entrada' | 'copas' | 'wallpapers'>('entrada')
    const [imgError, setImgError] = useState(false)
    const [imgLoading, setImgLoading] = useState(true)
    const [copasIndex, setCopasIndex] = useState(0)
    const [copasImgError, setCopasImgError] = useState(false)
    const [copasImgLoading, setCopasImgLoading] = useState(true)
    const [entradaIndex, setEntradaIndex] = useState(0)
    const [wallpaperIndex, setWallpaperIndex] = useState(0)
    const [wallpaperImgError, setWallpaperImgError] = useState(false)
    const [wallpaperImgLoading, setWallpaperImgLoading] = useState(true)

    // Memoized options
    const option = useMemo(() => ENTRADA_OPTIONS[entradaIndex], [entradaIndex])
    const copasOption = useMemo(() => COPAS_OPTIONS[copasIndex], [copasIndex])
    const previewImgPath = useMemo(() => `/images/entrada/${option}/preview.webp`, [option])
    const copasPreviewImgPath = useMemo(() => `/images/copas/${copasOption}/preview.webp`, [copasOption])
    const wallpaperOption = useMemo(() => WALLPAPER_OPTIONS[wallpaperIndex], [wallpaperIndex])
    const wallpaperPreviewImgPath = useMemo(
        () => `/images/wallpapers/${wallpaperOption}/preview.webp`,
        [wallpaperOption]
    )

    // Preload next/prev images for smoother carousel
    useEffect(() => {
        if (tab === 'entrada') {
            preloadImage(`/images/entrada/${ENTRADA_OPTIONS[(entradaIndex + 1) % ENTRADA_OPTIONS.length]}/preview.webp`)
            preloadImage(`/images/entrada/${ENTRADA_OPTIONS[(entradaIndex - 1 + ENTRADA_OPTIONS.length) % ENTRADA_OPTIONS.length]}/preview.webp`)
        }
    }, [entradaIndex, tab])

    useEffect(() => {
        if (tab === 'copas') {
            preloadImage(`/images/copas/${COPAS_OPTIONS[(copasIndex + 1) % COPAS_OPTIONS.length]}/preview.webp`)
            preloadImage(`/images/copas/${COPAS_OPTIONS[(copasIndex - 1 + COPAS_OPTIONS.length) % COPAS_OPTIONS.length]}/preview.webp`)
        }
    }, [copasIndex, tab])

    // Preload next/prev wallpaper images
    useEffect(() => {
        if (tab === 'wallpapers') {
            preloadImage(`/images/wallpapers/${WALLPAPER_OPTIONS[(wallpaperIndex + 1) % WALLPAPER_OPTIONS.length]}/preview.webp`)
            preloadImage(`/images/wallpapers/${WALLPAPER_OPTIONS[(wallpaperIndex - 1 + WALLPAPER_OPTIONS.length) % WALLPAPER_OPTIONS.length]}/preview.webp`)
        }
    }, [wallpaperIndex, tab])

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

    // Carrusel handlers
    const handlePrev = () => setEntradaIndex((prev) => (prev === 0 ? ENTRADA_OPTIONS.length - 1 : prev - 1))
    const handleNext = () => setEntradaIndex((prev) => (prev === ENTRADA_OPTIONS.length - 1 ? 0 : prev + 1))
    const handlePrevCopas = () => setCopasIndex((prev) => (prev === 0 ? COPAS_OPTIONS.length - 1 : prev - 1))
    const handleNextCopas = () => setCopasIndex((prev) => (prev === COPAS_OPTIONS.length - 1 ? 0 : prev + 1))

    // Acción de aplicar/cambiar Entrada
    const handleApplyEntrada = async () => {
        if (!folderPath) return
        setLoading(true)
        setError('')
        const basePath = folderPath + ENTRADA_IMG_PATH + option
        const result = await window.electronAPI?.replaceEntradaFiles?.(
            basePath,
            folderPath + ENTRADA_IMG_PATH,
            ENTRADA_FILES
        )
        setLoading(false)
        if (result?.error) setError(result.error)
        else alert('¡Entrada aplicada correctamente!')
    }

    const handlePrevWallpaper = () =>
        setWallpaperIndex((prev) => (prev === 0 ? WALLPAPER_OPTIONS.length - 1 : prev - 1))
    const handleNextWallpaper = () =>
        setWallpaperIndex((prev) => (prev === WALLPAPER_OPTIONS.length - 1 ? 0 : prev + 1))

    const handleApplyWallpaper = async () => {
        if (!folderPath) return
        setLoading(true)
        setError('')
        const basePath = folderPath + WALLPAPER_IMG_PATH + wallpaperOption
        const result = await window.electronAPI?.replaceEntradaFiles?.(
            basePath,
            folderPath + WALLPAPER_IMG_PATH,
            WALLPAPER_FILES
        )
        setLoading(false)
        if (result?.error) setError(result.error)
        else alert('¡Wallpaper aplicado correctamente!')
    }


    const handleApplyCopas = async () => {
        if (!folderPath) return
        setLoading(true)
        setError('')
        const basePath = folderPath + COPAS_IMG_PATH + copasOption
        const result = await window.electronAPI?.replaceEntradaFiles?.(
            basePath,
            folderPath + COPAS_IMG_PATH,
            COPAS_FILE
        )
        setLoading(false)
        if (result?.error) setError(result.error)
        else alert('¡Fondo de copas aplicado correctamente!')
    }

    // Resetear imgError y imgLoading al cambiar de opción
    useEffect(() => {
        setImgError(false)
        setImgLoading(true)
    }, [previewImgPath])

    useEffect(() => {
        setCopasImgError(false)
        setCopasImgLoading(true)
    }, [copasPreviewImgPath])

    useEffect(() => {
        setWallpaperImgError(false)
        setWallpaperImgLoading(true)
    }, [wallpaperPreviewImgPath])

    return (
        <div
            className="relative flex-1 min-h-0 w-full flex flex-col items-center justify-start bg-pes-bg"
            style={{
                height: `calc(100vh - ${TITLEBAR_HEIGHT}px)`,
                overflow: 'hidden'
            }}
        >
            {/* Título */}
            <div className="w-full flex justify-center items-center h-20 mb-2">
                <h2 className="text-3xl font-bold">Cambiar Fondos</h2>
            </div>

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
                <div className="w-full max-w-2xl flex flex-col items-center flex-1 min-h-0" style={{ overflow: 'hidden' }}>
                    {/* Tabs */}
                    <div className="flex gap-4 mb-6">
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
                        <div className="w-full flex flex-col items-center flex-1 min-h-0" style={{ overflow: 'hidden' }}>
                            {/* Carrusel */}
                            <div className="flex items-center justify-center gap-6 mb-4 w-full max-w-[480px]">
                                <button
                                    onClick={handlePrev}
                                    className="p-2 rounded-full bg-pes-card hover:bg-pes-primaryHover transition flex-shrink-0"
                                    aria-label="Anterior"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <span className="text-lg font-bold text-center flex-1 px-4 truncate">{option}</span>
                                <button
                                    onClick={handleNext}
                                    className="p-2 rounded-full bg-pes-card hover:bg-pes-primaryHover transition flex-shrink-0"
                                    aria-label="Siguiente"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            {/* Imagen o nombre */}
                            <div className="w-full max-w-[480px] h-[230px] bg-pes-card rounded-lg flex items-center justify-center mb-6 border-2 border-pes-border overflow-hidden relative flex-shrink-0">
                                {!imgError ? (
                                    <>
                                        {imgLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
                                                <span className="text-pes-textSecondary">Cargando imagen...</span>
                                            </div>
                                        )}
                                        <Image
                                            src={previewImgPath}
                                            alt={option}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            onError={() => { setImgError(true); setImgLoading(false) }}
                                            onLoadingComplete={() => setImgLoading(false)}
                                            sizes="480px"
                                            priority
                                            unoptimized
                                        />
                                    </>
                                ) : (
                                    <span className="text-lg text-pes-textSecondary">{option}</span>
                                )}
                            </div>
                            <button
                                onClick={handleApplyEntrada}
                                className="px-6 py-2 bg-pes-primary text-pes-text font-bold rounded-lg shadow-md hover:bg-pes-primaryHover transition"
                            >
                                Seleccionar esta Entrada
                            </button>
                        </div>
                    )}

                    {/* Fondo de copas */}
                    {tab === 'copas' && (
                        <div className="w-full flex flex-col items-center flex-1 min-h-0" style={{ overflow: 'hidden' }}>
                            {/* Carrusel */}
                            <div className="flex items-center justify-center gap-6 mb-4 w-full max-w-[480px]">
                                <button
                                    onClick={handlePrevCopas}
                                    className="p-2 rounded-full bg-pes-card hover:bg-pes-primaryHover transition flex-shrink-0"
                                    aria-label="Anterior"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <span className="text-lg font-bold text-center flex-1 px-4 truncate">{copasOption}</span>
                                <button
                                    onClick={handleNextCopas}
                                    className="p-2 rounded-full bg-pes-card hover:bg-pes-primaryHover transition flex-shrink-0"
                                    aria-label="Siguiente"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            {/* Imagen o nombre */}
                            <div className="w-full max-w-[480px] h-[230px] bg-pes-card rounded-lg flex items-center justify-center mb-6 border-2 border-pes-border overflow-hidden relative flex-shrink-0">
                                {!copasImgError ? (
                                    <>
                                        {copasImgLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
                                                <span className="text-pes-textSecondary">Cargando imagen...</span>
                                            </div>
                                        )}
                                        <Image
                                            src={copasPreviewImgPath}
                                            alt={copasOption}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            onError={() => { setCopasImgError(true); setCopasImgLoading(false) }}
                                            onLoadingComplete={() => setCopasImgLoading(false)}
                                            sizes="480px"
                                            priority
                                            unoptimized
                                        />
                                    </>
                                ) : (
                                    <span className="text-lg text-pes-textSecondary">{copasOption}</span>
                                )}
                            </div>
                            <button
                                onClick={handleApplyCopas}
                                className="px-6 py-2 bg-pes-primary text-pes-text font-bold rounded-lg shadow-md hover:bg-pes-primaryHover transition"
                            >
                                Seleccionar este Fondo de Copas
                            </button>
                        </div>
                    )}

                    {/* Wallpapers */}
                    {tab === 'wallpapers' && (
                        <div className="w-full flex flex-col items-center flex-1 min-h-0" style={{ overflow: 'hidden' }}>
                            {/* Carrusel */}
                            <div className="flex items-center justify-center gap-6 mb-4 w-full max-w-[480px]">
                                <button
                                    onClick={handlePrevWallpaper}
                                    className="p-2 rounded-full bg-pes-card hover:bg-pes-primaryHover transition flex-shrink-0"
                                    aria-label="Anterior"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <span className="text-lg font-bold text-center flex-1 px-4 truncate">{wallpaperOption}</span>
                                <button
                                    onClick={handleNextWallpaper}
                                    className="p-2 rounded-full bg-pes-card hover:bg-pes-primaryHover transition flex-shrink-0"
                                    aria-label="Siguiente"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            {/* Imagen o nombre */}
                            <div className="w-full max-w-[480px] h-[230px] bg-pes-card rounded-lg flex items-center justify-center mb-6 border-2 border-pes-border overflow-hidden relative flex-shrink-0">
                                {!wallpaperImgError ? (
                                    <>
                                        {wallpaperImgLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
                                                <span className="text-pes-textSecondary">Cargando imagen...</span>
                                            </div>
                                        )}
                                        <Image
                                            src={wallpaperPreviewImgPath}
                                            alt={wallpaperOption}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            onError={() => { setWallpaperImgError(true); setWallpaperImgLoading(false) }}
                                            onLoadingComplete={() => setWallpaperImgLoading(false)}
                                            sizes="480px"
                                            priority
                                            unoptimized
                                        />
                                    </>
                                ) : (
                                    <span className="text-lg text-pes-textSecondary">{wallpaperOption}</span>
                                )}
                            </div>
                            <button
                                onClick={handleApplyWallpaper}
                                className="px-6 py-2 bg-pes-primary text-pes-text font-bold rounded-lg shadow-md hover:bg-pes-primaryHover transition"
                            >
                                Seleccionar este Wallpaper
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CambiarFondosPage