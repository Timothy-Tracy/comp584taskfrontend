"use client"
import { deleteTask, toggleTask } from "@/api/tasksapi";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ReactNode, useEffect, useState } from "react";
import ChangeCategoryForm from "./ChangeCategoryForm";
import { useCategories } from "@/hooks/CategoriesContext";
import { useTasks } from "@/hooks/TasksContext";
import { Button } from "@/components/ui/button";

const Item = ({ task }: { task: any }) => {
  if(!task){
    return <></>
  }
  const [isChecked, setIsChecked] = useState(task?.complete||false)
  const { categories, initCategories } = useCategories();
  const { tasks, initTasks } = useTasks();
  const { toast } = useToast()
  
  
  async function handleToggle() {
    const result = await toggleTask(task.id)
    if (result.ok) {
      toast({
        title: `Successfully ${isChecked ? "Unchecked" : "Checked"} Task`,
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
  async function handleDelete(){
    await deleteTask(task.id)
    await initTasks()
  }
  return (
    <div className="flex items-center py-2 w-3/4  justify-between ">
      <div className="flex justify-start space-x-3 p-3">
        <Checkbox id={`${task.id}`} checked={isChecked} onClick={() => handleToggle()} />
        <label
          htmlFor={`${task.id}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >



          {task.body}
        </label>
      </div>
      <div className="flex justify-center">
        <ChangeCategoryForm task={task} defaultValue={task.categoryId}></ChangeCategoryForm>
      </div>
      <div className="flex justify-end">
        <Button variant={'destructive'} onClick={()=>{
          handleDelete()
        }}>Delete Task</Button>
      </div>
    </div>
  );
}

export default Item;