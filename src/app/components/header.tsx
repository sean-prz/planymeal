"use client"
import React from "react";
import { useRouter } from "next/navigation"; 

const Header = () => {
    const route = useRouter();
    return (
        <header className=" flex justify-around p-4  border-b border-gray-300">
                

            <p onClick={() => route.push("/")}className=" m-0 text-xl flex-1 font-bold cursor-pointer ">planymeal</p>
            {/* This is a non-functional header. No links or logic here. */}
            <div onClick={(e) => {e.stopPropagation;route.push("/shopping")}}className="flex-1 text-center cursor-pointer underline"> Shopping List </div>
        </header>
    );
};

export default Header;
