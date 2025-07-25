import React from 'react';

interface MainProps {
    children: React.ReactNode;
    className?: string;
}

export function Main({children, className}: MainProps) {
    return (
        <main className={`py-4 ${className || ''}`}>
            {children}
        </main>
    );
}