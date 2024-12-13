"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { postTask, AddTaskToCategory } from "@/api/tasksapi";
import { useCategories } from "@/hooks/CategoriesContext";
import { useTasks } from "@/hooks/TasksContext";
import { useAuth } from "./AuthContext";

const formSchema = z.object({
    title: z.string().optional(),
    body: z.string().min(2, { message: "Task body must be at least 2 characters." })
});

const NewTaskForm = () => {
    const { toast } = useToast();
    const { categories, initCategories } = useCategories();
    const { initTasks } = useTasks();
    const { logout } = useAuth();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { body: '', title: '' },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await postTask(values.body);
        if (result.ok) {
            toast({ title: `Successfully Added Task: ${values.body}` });
            initTasks();

            if (values.title) {
                const category = categories.find(cat => cat.title === values.title);
                if (category) {
                    const result2 = await AddTaskToCategory(result.body.id, category.id);
                    if (result2.ok) {
                        toast({ title: `Successfully Added Task To Category: ${category.title}` });
                        initCategories();
                    } else {
                        if (result2.status === 401) logout();
                        toast({ title: `Error: ${result2.statusText}`, description: `${JSON.stringify(result2.body)}`, variant: 'destructive' });
                    }
                }
            }
        } else {
            toast({ title: `Error: ${result.statusText}`, description: `${JSON.stringify(result.body)}`, variant: 'destructive' });
        }
    }

    return (
        <div className='flex flex-row align-middle items-center py-2 w-3/4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row align-middle justify-center items-center w-full">
                    <div className="flex justify-start">
                        <FormField control={form.control} name="body" render={({ field }) => (
                            <FormItem className="flex">
                                <FormControl>
                                    <Input {...field} placeholder="New Task Name" />
                                </FormControl>
                            </FormItem>
                        )} />
                        
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem className="flex">
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Category</SelectLabel>
                                                {categories.map(category => (
                                                    <SelectItem key={category.id} value={category.title}>
                                                        {category.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Add Task</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default NewTaskForm;
