import React, {useEffect, useRef, useState} from 'react';
import {Button} from "~/components/Button";

interface TimeEntryBlockProps {
}

const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export function TimeEntryBlock({}: TimeEntryBlockProps) {
    const [seconds, setSeconds] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const handleStartPause: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
            <div className="flex justify-between space-x-4 mb-4">
                <div className="flex items-stretch justify-between space-x-4">
                    <Button
                        className={isRunning ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}
                        onClick={handleStartPause}
                    >
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                    <div className="flex items-center text-3xl font-mono">
                        {formatTime(seconds)}
                    </div>
                    <input
                        id="projectId"
                        type="text"
                        placeholder="Project Name"
                        className="text-xl font-bold w-1/2 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>
                <Button className="bg-red-700 hover:bg-red-800">
                    Delete
                </Button>
            </div>
            <div
                contentEditable="true"
                className="w-full min-h-[80px] p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What did I do..."
                style={{whiteSpace: 'pre-wrap'}}
            >
            </div>
        </div>
    );
}