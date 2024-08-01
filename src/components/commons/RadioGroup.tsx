import React from "react";

interface RadioGroupProps {
  name: string;
  size: "sm" | "md";
  content: { [key: string]: string };
  selectedValue: string;
  onChange: (value: string) => void;
}

const SizeStyles = {
  sm: "w-[20px] h-[20px]",
  md: "w-[24px] h-[24px]",
};

export default function RadioGroup({ name, size, content, selectedValue, onChange }: RadioGroupProps) {
  return (
    <div className="flex gap-[16px] md:gap-[24px]">
      {Object.entries(content).map(([value, label]) => (
        <>
          <input type="radio" id={value} name={name} value={value} checked={selectedValue === value} onChange={() => onChange(value)} className="radio hidden" />
          <label htmlFor={value} key={value} className="flex items-center gap-[8px]">
            <i className={`${size === "sm" ? SizeStyles.sm : SizeStyles.md} flex items-center justify-center rounded-1/2 border-[2px] border-blue-300`}></i>
            <span className={`${size === "sm" ? "typo-lg-medium" : "typo-xl-medium"} text-black-600`}>{label}</span>
          </label>
        </>
      ))}
    </div>
  );
}
