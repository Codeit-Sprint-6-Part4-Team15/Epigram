interface ToggleProps {
  content: { [key: string]: string };
  checked: boolean;
  onChange: (value: boolean) => void;
}

const SizeStyles = {
  sm: "w-[32px] h-[16px] rounded-[8px] px-[3px]",
  md: "xl:w-[42px] xl:h-[24px] xl:rounded-[16px] xl:px-[4px]",
};

export default function Toggle({ content, checked, onChange } : ToggleProps) {
  return (
    <div>
      {Object.entries(content).map(([id, label]) => (
        <>
          <input type="checkbox" key={id} id={id} checked={checked} onChange={() => onChange(!checked)} className={`toggle hidden`}/>
          <label htmlFor={id} className="flex gap-[8px] items-center">
            <span className={`typo-xs-semibold xl:typo-lg-semibold text-gray-400`}>{label}</span>
            <span className={`${SizeStyles.sm} ${SizeStyles.md} flex items-center label bg-gray-300`}></span>
          </label>
        </>
      ))}
    </div>
  )
}