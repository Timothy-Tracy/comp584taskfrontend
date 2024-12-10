import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
const categories = ['All', 'Some', 'Otherssssss', 'More', 'All', 'Some', 'Otherssssss', 'More']
export function Categories() {
    return (
        <>
        
        <div className="flex flex-row flex-wrap w-full justify-center border-2 rounded-md">
            Categories: 
            <RadioGroup defaultValue="All0" className="flex flex-wrap">
                {categories.map((value,index) => 
            
                    <div key={index} className="flex justify-center items-center space-x-2  w-max ">
                    <RadioGroupItem value={value+index} id={`${index}`} />
                    <Label htmlFor={`${index}`}>{value}</Label>
                </div>
                )}
                
                
            </RadioGroup>
        </div>
        </>

    )
}
