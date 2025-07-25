import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEventHandler<HTMLButtonElement>) => void;
}

export function Button({children, className, onClick}: ButtonProps) {
    return (
        <button
            className={`flex items-center justify-center max-w-max min-w-[80px] min-h-12 px-4 py-2 text-white font-bold rounded transition duration-300 cursor-pointer ${className || ''}`}
            onClick={onClick}
        >
            {children}
        </button>
);
}