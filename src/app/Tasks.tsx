"use client"
import { Checkbox } from "@/components/ui/checkbox";

import { ReactNode, useEffect } from "react";
import Item from "./Item";
import { useTasks } from "@/hooks/TasksContext";

const Tasks = ( {category}: {category?:string}) => {
    const{tasks, initTasks} = useTasks();
    useEffect(()=>{
        initTasks()
    }, [])
    return (
       <>
       <h2>Completed Tasks</h2>
       {tasks.filter((task, index) => task.complete ==true).map((task, index)=> {
        return (
            <Item key={task.id} id={task.id} checked={task.complete}>{task.body}</Item>
            
        )
    })}
    <h2>Uncompleted Tasks</h2>
        {tasks.filter((task, index) => task.complete ==false).map((task, index)=> {
        return (
            <Item task={task} key={task.id} id={task.id} checked={task.complete}>{task.body}</Item>
            
        )
    })}
       </>
     );
}
 
export default Tasks;