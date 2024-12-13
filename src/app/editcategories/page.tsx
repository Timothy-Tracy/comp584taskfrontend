"use client"
import { Button } from "@/components/ui/button";
import { Categories } from "../CategoryCarousel";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CategoryForm from "./CategoryForm";
import NewCategoryForm from "./NewCategoryForm";
import { useEffect } from "react";
import { useCategories } from "@/hooks/CategoriesContext";
import { Ghost } from "lucide-react";


export default function EditCategories() {
   const router = useRouter()
   const {categories} = useCategories();
   useEffect(()=>{
    console.log('categories changed', categories)
    //router.refresh()
   }, [categories])
  return (
    <div className="flex flex-col w-full h-full">
   
    <Button variant={'secondary'} onClick={()=> router.back()}>Back</Button>
    <div className="flex justify-center p-5">
            <h1>Add and Edit Categories</h1>
            </div>
    

  
    

    {categories.map((category, index)=> {
        return (
            <CategoryForm title={category.title} id={category.id} key={category.id}/>
            
        )
    })}
  <NewCategoryForm/>
   </div>
  );
}
