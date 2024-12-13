"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import Item from "./Item";
import { useTasks } from "@/hooks/TasksContext";

const Tasks = ({ categoryId }: { categoryId?: string }) => {
  const { tasks, initTasks } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState<Array<any>>([]);

  useEffect(() => {
    initTasks();
  }, []);

  useEffect(() => {
    if (categoryId !== undefined) {
      setFilteredTasks(tasks.filter(task => task.categoryId == categoryId));
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, categoryId]);
  useEffect(() => {
    console.log(JSON.stringify(filteredTasks), 'filtered tasks')
  }, [filteredTasks]);

  return (
    <>
      <h2>Uncompleted Tasks</h2>
      {filteredTasks
        .filter(task => !task.complete)
        .map(task => (
          <Item task={task} key={task.id} />
        ))}
      <h2>Completed Tasks</h2>
      {filteredTasks
        .filter(task => task.complete)
        .map(task => (
          <Item task={task} key={task.id} />
        ))}
    </>
  );
};

export default Tasks;
