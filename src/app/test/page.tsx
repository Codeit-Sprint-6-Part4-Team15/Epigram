"use client";

import DropdownMenu from "@/src/components/commons/DropdownMenu";
import { useEffect, useState } from "react";


export default function Page() {
    const [selectedValue, setSelectedValue] = useState("");
    useEffect(()=>{
        console.log(selectedValue);
    },[selectedValue])

    return (
        <div>
             <DropdownMenu selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        </div>
    )
  }