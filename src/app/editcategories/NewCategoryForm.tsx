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
import { useCategories } from "@/hooks/CategoriesContext"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    })
})

const NewCategoryForm = () => {
    const router = useRouter()
    const {toast} = useToast()
    const{initCategories} = useCategories();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await postCategory(values.title)
        if(result.ok){
            toast({
                title: `Successfully Added Category: ${values.title}`,
               
              })
              initCategories()
        } else {
            toast({
                title: `Error: ${result.statusText}`,
                description: `${JSON.stringify(result.body)}`,
                variant: 'destructive'
              })
        }
        console.log(values)
    }

    return (
        <div className='flex flex-row w-full align-middle items-center py-2'>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row  align-middle justify-center items-center  w-full">
                    <div className="flex w-1/2  justify-start">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="flex">

                                    <FormControl>
                                        <Input  {...field} placeholder={'New Category'} />
                                    </FormControl>

                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex w-1/2  justify-end">
                        <Button type='submit'> Add Category</Button>
                    </div>
                  


                </form>
            </Form>
        </div>
    )
}
export default NewCategoryForm
