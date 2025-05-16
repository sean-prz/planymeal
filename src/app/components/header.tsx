"use client";
import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const Header = () => {
  const route = useRouter();
  return (
    <header className=" flex justify-around p-4  border-b border-gray-300">
      <p
        onClick={() => route.push("/")}
        className=" m-0 text-xl flex-2 font-bold cursor-pointer "
      >
        planymeal
      </p>
      {/* This is a non-functional header. No links or logic here. */}
      <div
        onClick={(e) => {
          e.stopPropagation;
          route.push("/shopping");
        }}
        className="flex-1 text-center cursor-pointer underline flex justify-center items-center "
      >
        <p> Shopping List</p>
        <ShoppingCartIcon
          className="ml-1 h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
      </div>
      <div
        className="flex-1 text-center cursor-pointer underline flex justify-center items-center"
        onClick={() => route.push("/ingredient")}
      >
        Ingredient List
      </div>
    </header>
  );
};

export default Header;
