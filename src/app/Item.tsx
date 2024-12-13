"use client"
import { toggleTask } from "@/api/tasksapi";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ReactNode, useEffect, useState } from "react";
import ChangeCategoryForm from "./ChangeCategoryForm";
import { useCategories } from "@/hooks/CategoriesContext";
import { useTasks } from "@/hooks/TasksContext";

const Item = ( {children,  checked, id, task}: {children:ReactNode,  checked:boolean, id: number, task: any}) => {
  const [isChecked, setIsChecked] = useState(checked)
  const {categories, initCategories} = useCategories();
  const{tasks, initTasks} = useTasks();
  const {toast} = useToast()
  useEffect(()=>{
    initCategories()
  },[])
  function whichCategory(){
    const x = categories.filter((category, index)=> category.id == task.categoryId)
    return x[0]
  }
  async function handleToggle(){
    const result = await toggleTask(id)
    if(result.ok){
      toast({
          title: `Successfully ${isChecked ? "Unchecked":"Checked"} Task`,
         
        })
        setIsChecked(result.body.complete)
        initTasks()
       
  } else {
      toast({
          title: `Error: ${result.statusText}`,
          description: `${JSON.stringify(result.body)}`,
          variant: 'destructive'
        })
  }
 
  }  
  return (
        <div className="flex items-center space-x-2 py-2">
      <Checkbox id={`${id}`} checked={isChecked} onClick={()=>handleToggle()}/>
      <label
        htmlFor={`${id}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {children}
      </label>
      <ChangeCategoryForm defaultValue={'hello'}></ChangeCategoryForm>
    </div>
     );
}
 
export default Item;