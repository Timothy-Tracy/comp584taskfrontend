"use client"
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";
import LoginButton from "./LoginButton";

const Header = () => {
    const {isAuthenticated} = useAuth();
    return ( 
        <div className="flex align-middle items-center w-full h-[50px] bg-zinc-950">
            <div className="flex ">
            <LoginButton></LoginButton>
{/* <p>{isAuthenticated ? 'true':'false'}</p> */}
            </div>
        </div>
     );
}
 
export default Header;