import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "regular";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { variant = "primary", className, ...rest } = props;

  return (
    <button
      {...rest}
      className={`w-fit rounded-md px-5 py-2 text-sm font-medium
      ${(variant === "primary" && "bg-indigo-600 text-indigo-50") ||
        (variant === "secondary" &&
          "bg-transparent text-indigo-300 shadow-[inset_0_0_0_1px] shadow-violet-500") ||
        (variant === "regular" && "bg-neutral-800 text-neutral-300") ||
        ""
        }
        ${className || ""}`
      }
    />
  );
};

export default Button;
