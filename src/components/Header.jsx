import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "../../db/apiAuth";

const Header = () => {
  const navigate = useNavigate();
  const {user,fetchUser}=UrlState();
  console.log(user);
 const {error,fn:out}= useFetch(logout)
  
 
  return (
    <div className="flex justify-between mt-4 items-center">
      <h1 className="font-bold mb-2 text-4xl font-mono cursor-pointer" onClick={()=>{
        navigate("");
      }}>URL Shortner</h1>
      {!user ? (
        <Button
          onClick={() => {
            navigate("/auth");
          }}
          className=""
        >
          Login
        </Button>
      ) : (
        <DropdownMenu>
        <DropdownMenuTrigger>

        
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AG</AvatarFallback>
          </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>(navigate("/dashboard"))}>
                <LinkIcon className=" h-4 w-5 " />
                My Links

                </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400  " onClick={()=>{
                  out()
                  fetchUser();
                }} >
                <LogOut className=" h-4 w-5 " />
                Logout
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Header;
