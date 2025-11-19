interface ProgressBarProps {
  percentage: number;
  width?: string;
  height?: string;
  backgroundColor?: string;
  fillColor?: string;
  className?: string;
}

export default function ProgressBar({
  percentage,
  width = "w-32 md:w-40",
  height = "h-2",
  backgroundColor = "#e5e5e5",
  fillColor = "#ffc000",
  className = "",
}: ProgressBarProps) {
  // Ensure percentage is between 0 and 100
  const safePercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safePercentage}
      className={`${className} ${width} ${height} rounded-full`}
      style={{ backgroundColor }}
    >
      {/* Filled portion of the progress bar */}
      <div
        className={`${height} rounded-full transition-all duration-300 ease-in-out`}
        style={{ width: `${safePercentage}%`, backgroundColor: fillColor }}
      />
    </div>
  );
}

