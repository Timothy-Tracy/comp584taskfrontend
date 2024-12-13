"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCategories } from '@/api/categoriesapi';

// Define the context type
interface CategoriesContextType {
    categories: Array<any>;
    initCategories: () => void;
}

// Create the context with a default value
const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

// Create a provider component
export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Array<any>>([]);
    const [prevNode, setPrevNode] = useState(null);

    const initCategories = async () => {
        console.log('initCategories called');
        const result = await getCategories();
        setCategories(result.body);
    };

    useEffect(() => {
        initCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories, initCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

// Custom hook to use the Categories context
export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoriesProvider');
    }
    return context;
};
