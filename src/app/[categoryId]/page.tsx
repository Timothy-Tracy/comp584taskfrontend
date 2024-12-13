"use client"
import { useParams, useSearchParams } from "next/navigation";
import { Categories } from "../CategoryCarousel";
import NewTaskForm from "../NewTaskForm";
import Tasks from "../Tasks";


export default function Home() {
    const searchParams = useSearchParams()
    const sp = useParams()
    
    const x = sp.categoryId || undefined
    console.log(x)
  return (
    <>
    <Categories defaultSelectedId={x}/>
   <div className="flex flex-col h-full w-full justify-center p-5 items-center">
    
    <Tasks categoryId={x}></Tasks>
    <h2> Add a new task</h2>
    <NewTaskForm/>
    

   </div>
   </>
  );
}
