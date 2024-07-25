import Link from "next/link";

interface ButtonProps {
  children: string;
  size: string;
  type: string;
  style?: string;
  href?: string | null;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ style = "main", href, type, size, className, onClick, disabled, children }: ButtonProps) {
  const btnStyle = (style: string) => {
    switch (style) {
      case "main":
        return "rounded-[8px] bg-black-500 text-white hover:bg-black-600 active:bg-black-700 disabled:bg-blue-400";
      case "outline":
        return "rounded-[12px] border border-black-500 bg-transparent text-black-700 hover:border-black-600 active:border-black-700 disabled:border-blue-400 disabled:bg-blue-300";
    }
  };

  const sizeStyle = (size: string) => {
    if (style === "outline") {
      switch (size) {
        case "sm":
          return "px-[16px] py-[11px] typo-lg-semibold";
        case "md":
          return "px-[16px] py-[11px] typo-lg-semibold min-w-[112px]";
        case "lg":
          return "px-[16px] py-[16px] typo-xl-semibold min-w-[286px]";
      }
    } else if (style === "main") {
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
    }
  };

  if (type === "link" && href) {
    return (
      <Link href={href} className={`inline-block ${btnStyle(style)} ${sizeStyle(size)} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={`${btnStyle(style)} ${sizeStyle(size)} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
