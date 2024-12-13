"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCategories } from '@/api/categoriesapi';

// Define the context type
interface CategoriesContextType {
    categories: Array<any>;
    initCategories: () => void;
    getCategoryById: (id:number) => any;
    refreshCategories: () => void;
}

// Create the context with a default value
const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

// Create a provider component
export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Array<any>>([]);
    const [v, setV] = useState(true)
    const initCategories = async () => {
        
            console.log('initCategories called');
            const result = await getCategories();
            setCategories(result.body);
        
       
    };
    useEffect(()=>{
        if(v){
            initCategories()
            setV(false)
        }
        
    }, [])

    const refreshCategories = async () => {
        
            console.log('refereshCategories called');
            const result = await getCategories();
            setCategories(result.body);
        
       
    };
    
    function getCategoryById(id:number): any{
        if (categories.length == 0){
            console.log('cats is null')
            return null
        }
        console.log('cats is not null')
        console.log(categories)


        const x = categories.filter((c)=>{ 
            
            return c.id == id}
    )
        console.log(JSON.stringify(x[0]))
        return x[0]
    }

    

    return (
        <CategoriesContext.Provider value={{ categories, refreshCategories,initCategories,getCategoryById }}>
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
