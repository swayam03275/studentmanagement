import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import {
  GENDER_OPTIONS,
  CATEGORY_OPTIONS,
  COURSE_OPTIONS,
  PASSING_YEAR_OPTIONS,
} from '../../utils/constants';

function FilterPanel({ filters, onFilterChange, onReset }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Toggle Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filters</span>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Active
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* Filter Body */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-800/50 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Gender */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Gender
              </label>
              <select
                value={filters.gender || ''}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 appearance-none cursor-pointer"
              >
                <option value="">All Genders</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g} className="bg-gray-800">
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-gray-800">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Course */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Course
              </label>
              <select
                value={filters.currentCourse || ''}
                onChange={(e) => handleChange('currentCourse', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 appearance-none cursor-pointer"
              >
                <option value="">All Courses</option>
                {COURSE_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-gray-800">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Passing Year */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Passing Year
              </label>
              <select
                value={filters.passingYear || ''}
                onChange={(e) => handleChange('passingYear', e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 appearance-none cursor-pointer"
              >
                <option value="">All Years</option>
                {PASSING_YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y} className="bg-gray-800">
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterPanel;
