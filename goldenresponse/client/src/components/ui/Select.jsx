import { forwardRef } from 'react';

const Select = forwardRef(
  (
    {
      label,
      error,
      options = [],
      placeholder = 'Select an option',
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {label}
            {props.required && (
              <span className="text-rose-400 ml-1">*</span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={`
              w-full bg-gray-800/50 border rounded-xl px-4 py-2.5
              text-sm text-gray-100
              transition-all duration-300 ease-out
              focus:outline-none focus:ring-2 focus:ring-offset-0
              disabled:opacity-50 disabled:cursor-not-allowed
              appearance-none cursor-pointer
              ${
                error
                  ? 'border-rose-500/50 focus:ring-rose-500/30 focus:border-rose-500'
                  : 'border-gray-700/50 focus:ring-indigo-500/30 focus:border-indigo-500/50 hover:border-gray-600'
              }
              ${className}
            `}
            {...props}
          >
            <option value="" className="bg-gray-800 text-gray-400">
              {placeholder}
            </option>
            {options.map((option) => {
              const value = typeof option === 'string' ? option : option.value;
              const label = typeof option === 'string' ? option : option.label;
              return (
                <option
                  key={value}
                  value={value}
                  className="bg-gray-800 text-gray-100"
                >
                  {label}
                </option>
              );
            })}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 animate-fade-in">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
