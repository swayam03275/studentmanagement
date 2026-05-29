function Loader({ fullPage = false, size = 'md', text = '' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]}
            border-gray-700 border-t-indigo-500
            rounded-full animate-spin
          `}
        />
        <div
          className={`
            absolute inset-0
            ${sizeClasses[size]}
            border-transparent border-t-violet-500/30
            rounded-full animate-spin
          `}
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
      </div>
      {text && (
        <p className="text-sm text-gray-400 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-indigo-500 rounded-full animate-spin" />
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-violet-500/30 rounded-full animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
            />
            <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-b-indigo-400/20 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
          </div>
          <p className="text-gray-400 font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return spinner;
}

export default Loader;
