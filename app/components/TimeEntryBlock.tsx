import React from 'react';
import {Button} from "~/components/Button";

interface TimeEntryBlockProps {
}

export function TimeEntryBlock({}: TimeEntryBlockProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
            <div className="flex justify-between space-x-4 mb-4">
                <div className="flex items-stretch justify-between space-x-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        Start/Pause
                    </Button>
                    <div className="flex items-center text-3xl font-mono">00:00:00</div>
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