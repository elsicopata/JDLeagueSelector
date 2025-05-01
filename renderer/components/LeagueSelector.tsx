const leagues = [
    {
        name: 'Liga BetPlay Dimayor (Colombia)',
        logo: '/images/colombia.webp',
        alt: 'Liga BetPlay Dimayor',
    },
    {
        name: 'Liga 1 (Perú)',
        logo: '/images/peru.webp',
        alt: 'Liga 1 Perú',
    },
    {
        name: 'Liga Profesional de Fútbol (Argentina)',
        logo: '/images/argentina.webp',
        alt: 'Liga Profesional de Fútbol',
    },
    {
        name: 'Primera División de Chile',
        logo: '/images/chile.webp',
        alt: 'Primera División Chile',
    },
    {
        name: 'Liga MX (México)',
        logo: '/images/mx.webp',
        alt: 'Liga MX',
    },
    {
        name: 'Major League Soccer (MLS)',
        logo: '/images/mls.webp',
        alt: 'MLS',
    },
]

type Props = {
    selected: string | null
    onSelect: (leagueName: string) => void
}

import Image from 'next/image';

export default function LeagueSelector({ selected, onSelect }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {leagues.map((league, index) => {
                const isSelected = league.name === selected

                return (
                    <div
                        key={index}
                        onClick={() => onSelect(league.name)}
                        className={`w-40 h-40 bg-gray-800 p-4 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-neon cursor-pointer flex items-center justify-center relative ${isSelected ? 'ring-4 ring-sky-500' : ''
                            }`}
                    >
                        <Image
                            src={league.logo}
                            alt={league.alt}
                            fill
                            className="object-contain"
                        />
                    </div>
                )
            })}
        </div>
    )
}