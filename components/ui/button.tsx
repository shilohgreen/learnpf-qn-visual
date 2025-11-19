import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-brand)] text-primary-foreground shadow hover:bg-[var(--primary-brand)]/90",
        destructive:
          "bg-destructive text-primary-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        dark: "bg-black text-primary-foreground shadow-sm hover:bg-black/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "text-primary-foreground font-semibold shadow-sm hover:opacity-90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-10 rounded-sm px-8",
        icon: "h-9 w-9",
        xl: "h-auto rounded-sm px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  customStyle?: React.CSSProperties;
  gradient?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      customStyle,
      gradient,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Determine if gradient is primary brand (CSS variable)
    const isPrimaryBrand = gradient?.includes("var(--primary-brand)");

    // Combine gradient background with customStyle
    const combinedStyle: React.CSSProperties = {
      ...(gradient ? { background: gradient } : {}),
      ...(isPrimaryBrand ? { color: "black" } : {}),
      ...customStyle,
    };

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant: gradient ? "gradient" : variant,
            size,
            className,
          })
        )}
        ref={ref}
        style={combinedStyle}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

