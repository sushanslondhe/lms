interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
      <div
        className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-in-out relative"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
          {progress}% Complete
        </span>
      </div>
    </div>
  );
}
