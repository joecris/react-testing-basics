import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("font-semibold px-2.5 py-1.5 rounded-md", {
  variants: {
    variant: {
      primary: "bg-blue-700 text-white",
      secondary: "bg-gray-300 text-slate-700",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children: ReactNode;
}

export default function Button({
  variant,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
