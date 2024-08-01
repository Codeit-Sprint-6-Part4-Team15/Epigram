"use client";

<<<<<<< HEAD
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
=======
import Dropdown from "@/src/components/commons/Dropdown";
import { useState } from "react";


export default function Page() {
    const [selectedValue, setSelectedValue] = useState("필터: 없음");

    return (
        <div>
             <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
>>>>>>> d5ef34e770d38317fd66fcd04da8b198a2c0ab77
        </div>
    )
  }