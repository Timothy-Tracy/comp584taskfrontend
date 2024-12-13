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
import createaccountapi from "@/api/createaccountapi"
import { useToast } from "@/hooks/use-toast"
import loginapi from "@/api/login"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

function CreateAccountForm() {
  const router = useRouter()
  const {login, setUser, getStatus, isAuthenticated} = useAuth()
  const {toast} = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const response = await createaccountapi(values.username, values.email, values.password)
    if(!response.ok){
      console.log('toasting')
      toast({
        title: `Error: ${response.statusText}`,
        description: `${JSON.stringify(response.body)}`,
        variant: 'destructive'
      })
    } else {
      toast({
        title: `Successfully Created Account`,
      });
      console.log(values)
    const result = await loginapi(values.username, values.password)
    if(!result.ok){
      console.log('toasting')
      toast({
        title: `Error: ${result.statusText}`,
        description: `${JSON.stringify(result.body)}`,
        variant: 'destructive'
      })

    } else {
      console.log(values.username)
      console.log(values.username)

      console.log(values.username)
      console.log(values.username)

      setUser(values.username)
      getStatus()
      router.push('/')
    if(isAuthenticated){
      login(values.username)
      
      
    }
    }
    }



  }
  // ...

  return (
    <Form {...form}>
      <h1>Create Account</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input  type="email" {...field} />
              </FormControl>

            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input  type="password" {...field} />
              </FormControl>

            </FormItem>
          )}
        />
        <div className="space-x-2">
          <Link href='/login'>

            <Button variant={'secondary'}>Back To Login</Button>

          </Link>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
export default CreateAccountForm
