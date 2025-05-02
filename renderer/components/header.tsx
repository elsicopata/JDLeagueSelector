import React from 'react'
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter()
    const isHome = router.pathname === '/home'

    return (
        <header className="absolute top-0 left-0 w-full h-16 bg-pes-card text-pes-text z-50 flex items-center px-6 shadow-md">
            {/* Botón volver */}
            {!isHome && (
                <button
                    onClick={() => router.push('/home')}
                    className="flex items-center gap-2 px-4 py-2 bg-transparent border-none rounded-lg font-bold text-lg text-pes-primary shadow-none transition focus:outline-none group"
                    style={{ zIndex: 2 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span className="relative group-hover:text-pes-primaryHover transition-colors duration-200">
                        Volver
                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-pes-primaryHover scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
                    </span>
                </button>
            )}

            {/* Título siempre centrado */}
            <div className="absolute left-0 right-0 top-0 h-16 flex items-center justify-center pointer-events-none select-none">
                <h1 className="text-xl font-bold tracking-wide drop-shadow-lg">PES 2013 Selector - JD PATCH</h1>
            </div>
        </header>
    )
}

export default Header