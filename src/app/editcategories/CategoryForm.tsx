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
import { deleteCategory, editCategory, EditCategory } from "@/api/categoriesapi"
import { useCategories } from "@/hooks/CategoriesContext"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    })
})

const CategoryForm = ({ title, id }: { title: string, id:number }) => {
    const router = useRouter()
    const {toast} = useToast()
    const {initCategories} = useCategories();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title,

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        const result = await editCategory(id, values.title)
        if(result.ok){
            toast({
                title: `Successfully Edited Category: ${values.title}`,
               
              })
          router.refresh()
        } else {
            toast({
                title: `Error: ${result.statusText}`,
                
                variant: 'destructive'
              })
        }
    }

  

    async function handleDelete(){
        const result = await deleteCategory(id)
        if(result.ok){
            toast({
                title: `Successfully Deleted Category: ${title}`,
               
              })
              initCategories()
        } else {
            toast({
                title: `Error: ${result.statusText}`,
                
                variant: 'destructive'
              })
        }

    }

    return (
        <div className='flex flex-row w-full align-middle items-center py-2'>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row  align-middle justify-center items-center  w-full">
                    <div className="flex w-1/2  justify-center">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="flex">

                                    <FormControl>
                                        <Input  {...field} placeholder={title} />
                                    </FormControl>

                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex w-1/2  justify-center">
                        <Button type='submit'> Confirm Name</Button>
                    </div>
                    <div className="flex w-1/2  justify-center">
                        <Button onClick={() => {
                            handleDelete()
                        }} variant={'destructive'}> Delete</Button>
                    </div>


                </form>
            </Form>
        </div>
    )
}
export default CategoryForm
