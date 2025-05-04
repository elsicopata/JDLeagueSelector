import React from 'react'
import { useRouter } from 'next/router'

const BackButton = () => {
    const router = useRouter()
    if (router.pathname === '/home') return null

    return (
        <div className="w-full flex items-start pt-3 pl-3">
            <button
                onClick={() => router.push('/home')}
                aria-label="Volver"
                className="p-1 bg-transparent border-none outline-none hover:scale-110 transition"
                style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="white"
                    className="w-7 h-7 drop-shadow-lg pointer-events-none"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
        </div>
    )
}

export default BackButton