"use client"
import { Button } from "@/components/ui/button";
import { Categories } from "../CategoryCarousel";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CategoryForm from "./CategoryForm";
import NewCategoryForm from "./NewCategoryForm";
import { useEffect } from "react";
import { useCategories } from "@/hooks/CategoriesContext";


export default function EditCategories() {
   const router = useRouter()
   const {categories} = useCategories();
   useEffect(()=>{
    console.log('categories changed', categories)
    //router.refresh()
   }, [categories])
  return (
    <>
 
    <Button onClick={()=> router.back()}>Back</Button>

  
    

    {categories.map((category, index)=> {
        return (
            <CategoryForm title={category.title} id={category.id} key={category.id}/>
            
        )
    })}
  <NewCategoryForm/>
   </>
  );
}
