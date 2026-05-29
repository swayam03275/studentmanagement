import { useState } from 'react';
import { Search, X } from 'lucide-react';

function SearchBar({ onSearch, placeholder = 'Search students by name, email, or roll number...' }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-gray-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full bg-gray-800/50 border border-gray-700/50 rounded-xl
          pl-11 pr-10 py-3
          text-sm text-gray-100 placeholder-gray-500
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50
          hover:border-gray-600
        "
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
