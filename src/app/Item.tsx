import { Checkbox } from "@/components/ui/checkbox";
import { ReactNode } from "react";

const Item = ( {children, key}: {children:ReactNode, key:string|undefined}) => {
    return (
        <div className="flex items-center space-x-2 py-2">
      <Checkbox id={key} />
      <label
        htmlFor={key}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {children}
      </label>
    </div>
     );
}
 
export default Item;