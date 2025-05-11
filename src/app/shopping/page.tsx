"use client"

import React from 'react';
import Checkbox from '@mui/material/Checkbox';

function ShoppingList({}) {
  return (
  <div className="m-5">
      <div className="text-xl font-bold">Shopping List</div>
      <div className="flex items-center"> 
        <Checkbox/> <p>Carotte</p>
      </div>
      <div className="flex items-center"> 
        <Checkbox/> <p>Not Carotte</p>
      </div>
      <div className="flex items-center"> 
        <Checkbox/> <p>Smithing template </p>
      </div>
  </div>
  )
}
export default ShoppingList;

