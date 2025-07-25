import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

export function Button({children, className}: ButtonProps) {
    return (
        <button
            className={`flex items-center justify-center max-w-max min-h-12 px-4 py-2 text-white font-bold rounded transition duration-300 cursor-pointer ${className || ''}`}>
            {children}
        </button>
    );
}