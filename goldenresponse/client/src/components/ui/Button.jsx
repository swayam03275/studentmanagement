import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30',
  secondary:
    'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-gray-600',
  danger:
    'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30',
  ghost:
    'bg-transparent hover:bg-gray-800/50 text-gray-300 hover:text-white',
  outline:
    'bg-transparent border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      icon: Icon,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          active:scale-[0.98]
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : Icon ? (
          <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
