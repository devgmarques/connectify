import * as React from 'react'

import { LuEye, LuEyeClosed } from 'react-icons/lu'

import { cn } from '@/lib'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordToggle?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showPasswordToggle, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

    function togglePasswordVisibility() {
      setIsPasswordVisible((prev) => !prev)
    }

    const inputType =
      showPasswordToggle && type === 'password'
        ? isPasswordVisible
          ? 'text'
          : 'password'
        : type

    return (
      <div className="relative w-full">
        <input
          type={inputType}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />

        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {isPasswordVisible ? (
              <LuEye size={15} />
            ) : (
              <LuEyeClosed size={15} />
            )}
          </button>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
