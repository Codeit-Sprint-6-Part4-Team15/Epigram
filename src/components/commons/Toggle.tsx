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
          <input type="checkbox" key={id} id={id} checked={checked} onChange={() => onChange(!checked)} className={`toggle hidden`} />
          <label htmlFor={id} className="flex items-center gap-[8px]">
            <span className={`typo-xs-semibold text-gray-400 xl:typo-lg-semibold`}>{label}</span>
            <i className={`${SizeStyles.sm} ${SizeStyles.md} flex items-center bg-gray-300`}></i>
          </label>
        </>
      ))}
    </div>
  )
}
