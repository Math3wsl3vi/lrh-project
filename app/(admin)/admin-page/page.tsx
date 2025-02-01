'use client'
import { Input } from "@/components/ui/input";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RootPage = () => {
    const router = useRouter()
  return (
    <div className="w-full h-screen">
      <h1>Login</h1>
      <div className="flex items-center justify-center pt-20">
        <div className="border rounded-md p-4 flex gap-5 flex-col w-[500px]">
            <h1 className="text-center -mb-4">Welcome to HMS</h1>
            <h1 className="text-center">Login to access the software</h1>
          <div className="w-full">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="p-1 border rounded-md w-[468px] text-left focus-visible:ring-0 focus-visible:ring-offset-0">Role</div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]">
                <DropdownMenuItem>Admin</DropdownMenuItem>
                <DropdownMenuItem>Doctor</DropdownMenuItem>
                <DropdownMenuItem>Nurse</DropdownMenuItem>
                <DropdownMenuItem>Procurement</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Input placeholder="Email" />
          </div>
          <div>
            <Input placeholder="Password"/>
          </div>
          <div className="flex items-center justify-center">
            <Button 
            onClick={()=>router.push('/home')}
            className="w-[300px] bg-green-1">Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
