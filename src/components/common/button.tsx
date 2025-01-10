import { ComponentProps } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps extends ComponentProps<'button'> {
  text?: string;
  textClassName?: string;
  icon?: IconType;
  iconColor?: string;
}

function Button({
  text,
  className,
  textClassName,
  icon: Icon,
  iconColor = '#fff',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`px-4 py-2  rounded-lg cursor-pointer bg-primary group hover:opacity-85  disabled:cursor-default disabled:bg-gray-500 flex items-center ${className} ${
        Icon ? 'justify-between' : 'justify-center'
      } `}
    >
      <span className={`text-white font-semibold ${textClassName} `}>
        {text && text}
      </span>
      {Icon && <Icon size={18} color={iconColor} />}
    </button>
  );
}

export default Button;
