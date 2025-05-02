import React from 'react'

const CupSelector = ({ selected, onSelect }: { selected: string | null, onSelect: (cupName: string) => void }) => {
    const cups = ['Copa Libertadores', 'Copa Sudamericana', 'Copa MX', 'MLS Cup'] // Agrega tus copas aquí

    return (
        <div className="flex flex-col items-center">
            {cups.map((cup) => (
                <button
                    key={cup}
                    onClick={() => onSelect(cup)}
                    className={`bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500 transition mb-4 ${selected === cup ? 'bg-green-600' : ''}`}
                >
                    {cup}
                </button>
            ))}
        </div>
    )
}

export default CupSelector
