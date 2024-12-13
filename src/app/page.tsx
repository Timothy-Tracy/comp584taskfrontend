import { Categories } from "./CategoryCarousel";
import Item from "./Item";
import NewTaskForm from "./NewTaskForm";
import Tasks from "./Tasks";

export default function Home() {
  return (
    <>
    <Categories/>
   <div className="flex flex-col h-full w-full justify-center p-5 items-center">
    
    <Tasks></Tasks>
    <NewTaskForm/>
    

   </div>
   </>
  );
}
