import React from 'react'
import { useRouter } from 'next/router'

const TitleBar = () => {
    const router = useRouter()
    const isHome = router.pathname === '/home'

    const handleMinimize = () => window.ipc?.send('window-minimize', null)
    const handleClose = () => window.ipc?.send('window-close', null)

    return (
        <div
            className="relative flex items-center justify-center h-10 bg-gray-800 border-b-2 border-white titlebar-border-glow rounded-t-xl"
            style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
        >
            {/* Botón volver a la izquierda, solo si no es home */}
            {!isHome && (
                <button
                    onClick={() => router.push('/home')}
                    aria-label="Volver"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-transparent group transition titlebar-btn"
                    style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
                >
                    <span className="relative block w-5 h-5">
                        {/* Flecha "<": dos barras unidas en el extremo izquierdo */}
                        <span className="absolute left-0 top-1/2 w-3 h-0.5 bg-white grow-bar-inset -rotate-45 origin-left" />
                        <span className="absolute left-0 top-1/2 w-3 h-0.5 bg-white grow-bar-inset rotate-45 origin-left" />
                    </span>
                </button>
            )}
            {/* Título centrado */}
            <span
                className="text-base font-bold tracking-widest pointer-events-none select-none text-white"
                style={{
                    letterSpacing: '0.18em',
                    textShadow: '0 1px 8px #fff3'
                }}
            >
                JD PATCH SELECTOR
            </span>
            {/* Botones a la derecha */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
                {/* Minimizar */}
                <button
                    aria-label="Minimizar"
                    onClick={handleMinimize}
                    className="w-8 h-8 flex items-center justify-center bg-transparent group transition titlebar-btn"
                >
                    <span className="block w-5 h-0.5 bg-white grow-bar-inset" />
                </button>
                {/* Cerrar */}
                <button
                    aria-label="Cerrar"
                    onClick={handleClose}
                    className="w-8 h-8 flex items-center justify-center bg-transparent group transition titlebar-btn"
                >
                    <span className="relative block w-5 h-5">
                        <span className="absolute left-0 top-1/2 w-5 h-0.5 bg-white grow-bar-inset rotate-45" />
                        <span className="absolute left-0 top-1/2 w-5 h-0.5 bg-white grow-bar-inset -rotate-45" />
                    </span>
                </button>
            </div>
        </div>
    )
}

export default TitleBar