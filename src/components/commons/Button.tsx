import React from "react";
import Link from "next/link";

// 각 variant에 따른 size 가능 타입 정의
type VariantSizeMap = {
  main: {
    default: "xs" | "sm" | "md" | "md-2" | "lg";
    md?: "xs" | "sm" | "md" | "md-2" | "lg";
    xl?: "xs" | "sm" | "md" | "md-2" | "lg";
  };
  outline: {
    default: "sm" | "md" | "lg";
    md?: "sm" | "md" | "lg";
    xl?: "sm" | "md" | "lg";
  };
  wide: {
    default: "xl" | "2xl" | "3xl";
    md?: "xl" | "2xl" | "3xl";
    xl?: "xl" | "2xl" | "3xl";
  };
};

type Variant = "main" | "outline" | "wide";

// ButtonProps 타입 정의
interface ButtonProps<V extends keyof VariantSizeMap> {
  children: React.ReactNode;
  size: VariantSizeMap[Variant];
  type: "button" | "link";
  variant?: Variant;
  href?: string;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// 스타일 맵 정의
const SizeStyles = {
  main: {
    xs: "py-[6px] typo-xs-semibold",
    sm: "py-[9px] typo-lg-semibold",
    md: "py-[11px] typo-lg-semibold",
    "md-2": "py-[12px] typo-xl-semibold",
    lg: "py-[16px] typo-xl-semibold",
  },
  outline: {
    sm: "py-[11px] typo-lg-semibold",
    md: "py-[11px] typo-lg-semibold",
    lg: "py-[16px] typo-xl-semibold",
  },
  wide: {
    xl: "py-[9px] typo-lg-semibold",
    "2xl": "py-[9px] typo-lg-semibold",
    "3xl": "py-[16px] typo-xl-semibold",
  },
};

const mdSizeStyles = {
  main: {
    xs: "md:py-[6px] md:typo-xs-semibold",
    sm: "md:py-[9px] md:typo-lg-semibold",
    md: "md:py-[11px] md:typo-lg-semibold",
    "md-2": "md:py-[12px] md:typo-xl-semibold",
    lg: "md:py-[16px] md:typo-xl-semibold",
  },
  outline: {
    sm: "md:py-[11px] md:typo-lg-semibold",
    md: "md:py-[11px] md:typo-lg-semibold",
    lg: "md:py-[16px] md:typo-xl-semibold",
  },
  wide: {
    xl: "md:py-[9px] md:typo-lg-semibold",
    "2xl": "md:py-[9px] md:typo-lg-semibold",
    "3xl": "md:py-[16px] md:typo-xl-semibold",
  },
};

const xlSizeStyles = {
  main: {
    xs: "xl:py-[6px] xl:typo-xs-semibold",
    sm: "xl:py-[9px] xl:typo-lg-semibold",
    md: "xl:py-[11px] xl:typo-lg-semibold",
    "xl-2": "md:py-[12px] xl:typo-xl-semibold",
    lg: "xl:py-[16px] xl:typo-xl-semibold",
  },
  outline: {
    sm: "xl:py-[11px] xl:typo-lg-semibold",
    md: "xl:py-[11px] xl:typo-lg-semibold",
    lg: "xl:py-[16px] xl:typo-xl-semibold",
  },
  wide: {
    xl: "xl:py-[9px] xl:typo-lg-semibold",
    "2xl": "xl:py-[9px] xl:typo-lg-semibold",
    "3xl": "xl:py-[16px] xl:typo-xl-semibold",
  },
};

// Button 컴포넌트 정의
const Button = <V extends keyof VariantSizeMap>({ variant = "main", className = "", disabled = false, href, type, size, onClick, children }: ButtonProps<V>) => {
  const getBtnStyle = (variant: Variant) => {
    switch (variant) {
      case "main":
        return "w-full rounded-[8px] bg-black-500 text-white hover:bg-black-600 active:bg-black-700 disabled:bg-blue-400 px-[16px]";
      case "outline":
        return "w-full rounded-[12px] border border-black-500 bg-transparent text-black-700 hover:border-black-600 active:border-black-700 disabled:border-blue-400 disabled:bg-blue-300 px-[16px]";
      case "wide":
        return "w-full rounded-[12px] bg-black-500 text-white hover:bg-black-600 active:bg-black-700 disabled:bg-blue-300 px-[16px]";
      default:
        return "";
    }
  };

  const getSizeStyle = (size: VariantSizeMap[Variant]) => {
    let result = "";
    let sizeValue: keyof (typeof SizeStyles)[typeof variant];

    // Default size
    sizeValue = size.default as keyof (typeof SizeStyles)[typeof variant];
    result += ` ${SizeStyles[variant][sizeValue] || ""}`;

    // md size
    if (size.md) {
      sizeValue = size.md as keyof (typeof SizeStyles)[typeof variant];
      result += ` ${mdSizeStyles[variant][sizeValue] || ""}`;
    }

    // xl size
    if (size.xl) {
      sizeValue = size.xl as keyof (typeof SizeStyles)[typeof variant];
      result += ` ${xlSizeStyles[variant][sizeValue] || ""}`;
    }

    return result;
  };

  if (type === "link" && href) {
    return (
      <Link href={href} className={`inline-block text-center ${getBtnStyle(variant)} ${getSizeStyle(size)} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={`${getBtnStyle(variant)} ${getSizeStyle(size)} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
