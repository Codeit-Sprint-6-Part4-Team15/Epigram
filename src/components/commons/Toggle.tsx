interface ToggleProps {
  content: { value: string; label: string }[];
  checked: boolean;
  onChange: (value: boolean) => void;
}

const SizeStyles = {
  sm: 'w-[32px] h-[16px] rounded-[8px] px-[3px]',
  md: 'xl:w-[42px] xl:h-[24px] xl:rounded-[16px] xl:px-[4px]',
};

export default function Toggle({ content, checked, onChange }: ToggleProps) {
  return (
    <div>
      {content.map(({ value, label }) => (
        <div key={value}>
          <input
            type="checkbox"
            id={value}
            checked={checked}
            onChange={() => onChange(!checked)}
            className={`toggle hidden`}
          />
          <label htmlFor={value} className="flex items-center gap-[8px]">
            <i
              className={`${SizeStyles.sm} ${SizeStyles.md} flex items-center bg-gray-300`}
            ></i>
            <span
              className={`typo-xs-semibold text-gray-400 xl:typo-lg-semibold`}
            >
              {label}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}
