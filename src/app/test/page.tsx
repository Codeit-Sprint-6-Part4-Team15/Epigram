"use client";

import Button from "@/src/components/commons/Button";
import Dropdown from "@/src/components/commons/Dropdown";
import { useState } from "react";


export default function Page() {
    const [selectedValue, setSelectedValue] = useState("필터: 없음");

    return (
        <div>
            <Button type="button" size={{default:"md", md:"md", xl:"md-2"}} variant="main">버튼</Button>
             <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        </div>
    )
  }