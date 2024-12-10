"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginButton = () => {
    const router = useRouter()
    const { isAuthenticated, user, logout } = useAuth()
    return (
        <div className="p-1">
            {isAuthenticated ?
                <div className="flex items-center space-x-1">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="font-bold">{user?.username}</p>
                    <Link href='/login'>
                    <Button variant='destructive' onClick={()=>logout()}>Logout</Button>
                    </Link>
                </div>

                : <Button onClick={()=> router.push('/login')}>Login</Button>}
        </div>
    );
}

export default LoginButton;