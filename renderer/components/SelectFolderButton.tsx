import React from 'react'

type Props = {
    onClick: () => void
    className?: string
}

const SelectFolderButton: React.FC<Props> = ({ onClick, className }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-6 py-3 rounded-lg bg-pes-primary text-pes-text font-semibold text-lg shadow-md border-2 border-pes-border hover:bg-pes-primaryHover transition
      focus:outline-none focus:ring-2 focus:ring-pes-border ${className || ''}`}
        type="button"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7V5a2 2 0 012-2h3.172a2 2 0 011.414.586l1.828 1.828A2 2 0 0012.828 6H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
        Seleccionar carpeta de JD PATCH
    </button>
)

export default SelectFolderButton