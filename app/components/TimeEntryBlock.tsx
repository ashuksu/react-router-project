import React, {useEffect, useRef, useState} from 'react';
import {Button} from "~/components/Button";

interface TimeEntryBlockProps {
    id: string;
}

const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export function TimeEntryBlock({id}: TimeEntryBlockProps) {
    const [seconds, setSeconds] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        const savedState = localStorage.getItem(`timeEntryBlock-${id}`);
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setSeconds(parsedState.seconds);
            setIsRunning(parsedState.isRunning);
            setProjectName(parsedState.projectName);
            setDescription(sanitizeHtml(parsedState.description));
        }
    }, [id]);

    useEffect(() => {
        const stateToSave = {
            seconds,
            isRunning,
            projectName,
            description: sanitizeHtml(description)
        };
        localStorage.setItem(`timeEntryBlock-${id}`, JSON.stringify(stateToSave));
    }, [id, seconds, isRunning, projectName, description]); // Save when any of these states change

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

    const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(event.target.value);
    };

    const handleDescriptionChange = (event: React.FocusEvent<HTMLDivElement>) => {
        const rawHtml = event.target.innerHTML;
        // TODO: to be updated
        // IMPORTANT: In a real application, you MUST use a robust HTML sanitization library here
        // (e.g., DOMPurify) to prevent Cross-Site Scripting (XSS) attacks.
        // For this example, we'll use a very basic, incomplete sanitization that only removes script tags.
        // This is NOT sufficient for production.
        const sanitizedHtml = sanitizeHtml(rawHtml);
        setDescription(sanitizedHtml);
    };

    // TODO: Very basic HTML sanitizer. NOT PRODUCTION READY.
    // A real solution would use a library like DOMPurify.
    const sanitizeHtml = (html: string): string => {
        if (!html) return '';
        // Remove script tags and common event handlers for demonstration.
        // This is a highly simplified example and not secure for production.
        let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        sanitized = sanitized.replace(/on\w+="[^"]*"/gi, ''); // Remove inline event handlers
        return sanitized;
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
                        id={`projectId-${id}`}
                        type="text"
                        placeholder="Project Name"
                        className="text-xl font-bold w-1/2 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                        value={projectName}
                        onChange={handleProjectNameChange}
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
                onBlur={handleDescriptionChange}
                dangerouslySetInnerHTML={{__html: description}}
            >
            </div>
        </div>
    );
}