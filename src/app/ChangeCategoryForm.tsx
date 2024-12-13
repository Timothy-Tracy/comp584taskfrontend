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



import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddTaskToCategory } from "@/api/tasksapi";
import { useCategories } from "@/hooks/CategoriesContext";
import { useTasks } from "@/hooks/TasksContext";
import { useAuth } from "./AuthContext";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
});

const ChangeCategoryForm = ({ defaultValue, task }: { defaultValue: number, task: any }) => {
  const { toast } = useToast();
  const { categories, initCategories, getCategoryById } = useCategories();
  const { logout } = useAuth();
  const [defaultCategoryTitle, setDefaultCategoryTitle] = useState<string | undefined>();

  useEffect(() => {
    const category = getCategoryById(defaultValue);
    if (defaultValue && category) {
      setDefaultCategoryTitle(category.title);
    }
  }, [defaultValue, getCategoryById]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedCategory = categories.find(category => category.title === values.title);
    if (!selectedCategory) {
      toast({
        title: `Error: Category not found`,
        description: `${values.title} is not a valid category`,
        variant: 'destructive'
      });
      return;
    }

    const result = await AddTaskToCategory(task.id, selectedCategory.id);
    if (result.ok) {
      toast({
        title: `Successfully Added Task To Category: ${selectedCategory.title}`,
      });
      initCategories();
    } else {
      if (result.status === 401) {
        logout();
      }
      toast({
        title: `Error: ${result.statusText}`,
        description: `${JSON.stringify(result.body)}`,
        variant: 'destructive'
      });
    }
  }

  return (
    <div className='flex flex-row w-full align-middle items-center py-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row align-middle justify-center items-center w-full">
          <div className="flex w-1/2 justify-start">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      form.handleSubmit(onSubmit)();
                    }} defaultValue={getCategoryById(defaultValue)?.title||null}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Uncategorized" />
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
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangeCategoryForm;
