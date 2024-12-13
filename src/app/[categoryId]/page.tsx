"use client"
import { useParams } from "next/navigation";
import { Categories } from "../CategoryCarousel";
import Item from "../Item";


export default function HomeWithCategory() {
    const params = useParams()
   console.log(params)
  return (
    <>
    <Categories defaultSelectedId={`${params.categoryId}`}/>
   <div className="flex flex-col h-full w-full justify-center p-5 items-center">
    
    <Item>Hello</Item>
    <Item>Hello</Item>
    <Item>Hello3</Item>

   </div>
   </>
  );
}
