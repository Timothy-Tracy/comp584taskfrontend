"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "../AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import loginapi from "@/api/login"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { postCategory } from "@/api/categoriesapi"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddTaskToCategory, postTask } from "@/api/tasksapi"

import { useCategories } from "@/hooks/CategoriesContext"
import { useTasks } from "@/hooks/TasksContext"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    body: z.string().min(2, {
        message: "title must be at least 2 characters.",
    })
})

const NewTaskForm = () => {
    const router = useRouter()
    const { toast } = useToast()
    const { categories, initCategories } = useCategories();
    const { tasks, initTasks } = useTasks();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            body: '',
            title: ''


        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await postTask(values.body)
        if (result.ok) {
            toast({
                title: `Successfully Added Task: ${values.title}`,

            })
            initTasks()
        } else {
            toast({
                title: `Error: ${result.statusText}`,
                description: `${JSON.stringify(result.body)}`,
                variant: 'destructive'
            })
        }
        
        const category = categories.filter((category, index) => category.title ==values.title)
        console.log(values)

        const result2 = await AddTaskToCategory(result.body.id, category[0].id)
        if (result2.ok) {
            toast({
                title: `Successfully Added Task To Category: ${category[0].title}`,

            })
            initCategories()
        } else {
            toast({
                title: `Error: ${result.statusText}`,
                description: `${JSON.stringify(result.body)}`,
                variant: 'destructive'
            })
        }
    }

    return (
        <div className='flex flex-row w-full align-middle items-center py-2'>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row  align-middle justify-center items-center  w-full">
                    <div className="flex w-1/2  justify-start">
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem className="flex">

                                    <FormControl>
                                        <Input  {...field} placeholder={'New Task Name'} />
                                    </FormControl>

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="flex">

                                    <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Category</SelectLabel>
                                                    {categories.map((category, index) => {
                                                        return (
                                                           <SelectItem  key={category.id} value={category.title}>{category.title}</SelectItem>

                                                        )
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>

                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex w-1/2  justify-end">
                        <Button type='submit'> Add Task</Button>
                    </div>



                </form>
            </Form>
        </div>
    )
}
export default NewTaskForm
