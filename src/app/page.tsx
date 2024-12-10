import { Categories } from "./CategoryCarousel";
import Item from "./Item";

export default function Home() {
  return (
    <>
    <Categories/>
   <div className="flex flex-col h-full w-full justify-center p-5 items-center">
    
    <Item>Hello</Item>
    <Item>Hello</Item>
    <Item>Hello3</Item>

   </div>
   </>
  );
}
