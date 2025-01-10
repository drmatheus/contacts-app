import { ComponentProps, forwardRef, useId } from 'react';

interface SelectProps extends ComponentProps<'select'> {
  label?: string;
  error?: string;
  containerClass?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { name, label, error, className, containerClass, options, ...rest },
    ref
  ) => {
    const selectId = useId();

    return (
      <label
        htmlFor={`${name}-${selectId}`}
        className={`flex flex-col gap-y-1  font-medium text-sm  ${containerClass} `}
      >
        {label && <span className="text-primary font-medium">{label}</span>}
        <select
          {...rest}
          ref={ref}
          name={name}
          id={`${name}-${selectId}`}
          className={`px-3 py-2 border border-slate-200 text-gray-700  bg-slate-50 rounded-lg focus:outline-none focus:border-primary placeholder:text-gray-400 ${className}`}
        >
          <option value="">Selecione uma opção</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <small className="text-xs text-red-400">{error}</small>}
      </label>
    );
  }
);

Select.displayName = 'Select';

export default Select;
