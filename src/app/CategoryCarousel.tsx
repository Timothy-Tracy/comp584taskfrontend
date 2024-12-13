"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCategories } from "@/hooks/CategoriesContext"
const categories = ['All', 'Some', 'Otherssssss', 'More', 'All', 'Some', 'Otherssssss', 'More']
export function Categories({defaultSelectedId}:{defaultSelectedId?: string}) {

    const {categories, initCategories} = useCategories();
    const router = useRouter()
    
    return (
        <>
        
        <div className="flex flex-row flex-wrap items-center w-full justify-center border-2 rounded-md space-x-2">
            Categories: 
            <RadioGroup className="flex flex-wrap">
                {categories.map((value,index) => 
            
                    <div key={value.id} className="flex justify-center items-center space-x-2  w-max ">
                    <RadioGroupItem value={value.id} id={`${value.id}`} checked={value.id == defaultSelectedId} onClick={()=>router.push(`/${value.id}`)}/>
                    <Label htmlFor={`${value.id}`}>{value.title}</Label>
                </div>
                )}
                
                
            </RadioGroup>
            <div className="px-2">
                <Link href='/editcategories'>
                
            <Button variant='secondary' size={'sm'}>Edit Categories</Button>
            
</Link>
            </div>
        </div>
        </>

    )
}
