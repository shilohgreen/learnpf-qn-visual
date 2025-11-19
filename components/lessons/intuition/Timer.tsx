import React from "react";

interface TimerProps {
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  size?: number; // diameter in pixels
  className?: string;
  timerLimit: number;
}

export default function Timer({
  timeRemaining,
  formatTime,
  size = 64,
  className = "",
  timerLimit,
}: TimerProps) {
  const strokeWidth = 4;
  const radius = size / 2 - strokeWidth; // radius adjusted for stroke width
  const circumference = 2 * Math.PI * radius;

  // progress between 0 and 1
  const progress = Math.max(0, Math.min(1, timeRemaining / timerLimit));
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <svg className="absolute top-0 left-0" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // Tailwind gray-200
          strokeWidth={strokeWidth}
          fill="white"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--primary-brand)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            transition: "stroke-dashoffset 0.3s ease", // smooth progress update
          }}
        />
      </svg>

      {/* Timer text */}
      <span
        className="text-sm font-semibold z-10"
        style={{ color: "var(--text-primary)" }}
      >
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
}

