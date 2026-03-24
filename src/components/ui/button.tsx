import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = (variant: string = 'default', size: string = 'default', className: string = '') => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group"
  let variantStyles = "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_10px_rgba(var(--primary),0.4)] hover:shadow-[0_0_20px_rgba(var(--primary),0.7)]"
  if (variant === 'destructive') variantStyles = "bg-destructive text-destructive-foreground hover:bg-destructive/90"
  if (variant === 'outline') variantStyles = "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  if (variant === 'secondary') variantStyles = "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_0_10px_rgba(var(--secondary),0.4)] hover:shadow-[0_0_20px_rgba(var(--secondary),0.7)]"
  if (variant === 'ghost') variantStyles = "hover:bg-accent hover:text-accent-foreground"
  if (variant === 'link') variantStyles = "text-primary underline-offset-4 hover:underline"

  let sizeStyles = "h-10 px-4 py-2"
  if (size === 'sm') sizeStyles = "h-9 rounded-md px-3"
  if (size === 'lg') sizeStyles = "h-11 rounded-md px-8"
  if (size === 'icon') sizeStyles = "h-10 w-10"

  return cn(base, variantStyles, sizeStyles, className)
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={buttonVariants(variant, size, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
