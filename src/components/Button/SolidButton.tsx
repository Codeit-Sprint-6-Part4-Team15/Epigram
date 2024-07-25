interface MainButtonProps {
  children: string;
  size: string;
}

export default function MainButton({ size, children }: MainButtonProps) {
  const sizeStyle = (size: string) => {
    switch (size) {
      case "xs":
        return "px-[16px] py-[6px] typo-xs-semibold";
      case "sm":
        return "px-[16px] py-[9px] typo-lg-semibold";
      case "md":
        return "px-[16px] py-[11px] typo-lg-semibold min-w-[112px]";
      case "md-2":
        return "px-[16px] py-[12px] typo-xl-semibold min-w-[136px]";
      case "lg":
        return "px-[16px] py-[16px] typo-xl-semibold min-w-[286px]";
    }
  };
  return (
    <button type="button" className={`${sizeStyle(size)} rounded-[8px] bg-black-500 text-white hover:bg-black-600 active:bg-black-700 disabled:bg-blue-400`}>
      {children}
    </button>
  );
}
