import { ComponentProps, forwardRef, useId } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
  containerClass?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, error, className, containerClass, ...rest }, ref) => {
    const inputId = useId();

    return (
      <label
        htmlFor={`${name}-${inputId}`}
        className={`flex flex-col gap-y-1  font-medium text-sm  ${containerClass} `}
      >
        {label && <span className="text-primary font-medium">{label}</span>}
        <input
          {...rest}
          ref={ref}
          name={name}
          id={`${name}-${inputId}`}
          className={`px-3 py-2 border border-slate-200 text-gray-700  bg-slate-50 rounded-lg focus:outline-none focus:border-primary placeholder:text-gray-400 ${className}`}
        />
        {error && <small className="text-xs text-red-400">{error}</small>}
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;
