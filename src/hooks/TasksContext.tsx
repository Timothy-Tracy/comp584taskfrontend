"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTasks } from '@/api/tasksapi';

// Define the context type
interface TasksContextType {
    tasks: Array<any>;
    initTasks: () => void;
}

// Create the context with a default value
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// Create a provider component
export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Array<any>>([]);

    const initTasks = async () => {
        console.log('initTasks called');
        const result = await getTasks();
        setTasks(result.body);
    };

    useEffect(() => {
        initTasks();
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, initTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

// Custom hook to use the Tasks context
export const useTasks = () => {
    const context = useContext(TasksContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context;
};
