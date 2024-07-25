interface SolidButtonProps {
  children: string;
  size: string;
}

export default function OutlineButton({ size, children }: SolidButtonProps) {
  const sizeStyle = (size: string) => {
    switch (size) {
      case "sm":
        return "px-[16px] py-[11px] typo-lg-semibold";
      case "md":
        return "px-[16px] py-[11px] typo-lg-semibold min-w-[112px]";
      case "lg":
        return "px-[16px] py-[16px] typo-xl-semibold min-w-[286px]";
    }
  };
  return (
    <button
      type="button"
      className={`${sizeStyle(size)} rounded-[12px] border border-black-500 bg-transparent text-black-700 hover:border-black-600 active:border-black-700 disabled:border-blue-400 disabled:bg-blue-300`}
    >
      {children}
    </button>
  );
}
