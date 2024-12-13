import { Categories } from "./CategoryCarousel";
import Item from "./Item";
import NewTaskForm from "./NewTaskForm";
import Tasks from "./Tasks";

export default function Home() {
  return (
    <>
    <Categories defaultSelectedId={'-1'}/>
   <div className="flex flex-col h-full w-full justify-center p-5 items-center">
    
    <Tasks></Tasks>
    <h2> Add a new task</h2>
    <NewTaskForm/>
    

   </div>
   </>
  );
}
