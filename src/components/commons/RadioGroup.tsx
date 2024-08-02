interface RadioGroupProps {
  name: string;
  size: "sm" | "md";
  content: { value: string; label: string }[]; // 배열 형태로 변경
  selectedValue: string;
  onChange: (value: string) => void;
}

const SizeStyles = {
  sm: "w-[20px] h-[20px]",
  md: "w-[24px] h-[24px]",
};

export default function RadioGroup({ name, size, content, selectedValue, onChange }: RadioGroupProps) {
  return (
    <ul className="flex gap-[16px] md:gap-[24px]">
      {content.map(({ value, label }) => (
        <li key={value}>
          <input
            type="radio"
            id={value}
            name={name}
            value={value}
            checked={selectedValue === value}
            onChange={() => onChange(value)}
            className="radio hidden"
          />
          <label htmlFor={value} className="flex items-center gap-[8px]">
            <i className={`${size === "sm" ? SizeStyles.sm : SizeStyles.md} flex items-center justify-center rounded-full border-[2px] border-blue-300`}></i>
            <span className={`${size === "sm" ? "typo-lg-medium" : "typo-xl-medium"} text-black-600`}>
              {label}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
