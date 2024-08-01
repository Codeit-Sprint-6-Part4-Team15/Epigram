"use client";

import Dropdown from "@/src/components/commons/Dropdown";
import { useState } from "react";


export default function Page() {
    const [selectedValue, setSelectedValue] = useState("필터: 없음");

    return (
        <div>
             <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        </div>
    )
  }