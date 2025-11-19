"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface MultipleChoiceAnswerProps {
  options: string[];
  selectedAnswer: string | number | null;
  onAnswerSelect: (answer: number) => void;
  disabled?: boolean;
  correctAnswerIndexes: number[];
}

export default function MultipleChoiceAnswer({
  options,
  selectedAnswer,
  onAnswerSelect,
  disabled = false,
  correctAnswerIndexes = [],
}: MultipleChoiceAnswerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(4);

  const calcCols = useCallback(() => {
    if (!ref.current) return;
    const containerWidth = ref.current.offsetWidth;

    const temp = document.createElement("span");
    Object.assign(temp.style, {
      position: "absolute",
      visibility: "hidden",
      whiteSpace: "nowrap",
    });
    document.body.appendChild(temp);

    const maxWidth = Math.max(
      ...options.map((o) => {
        temp.innerText = o;
        return temp.offsetWidth;
      }),
    );
    document.body.removeChild(temp);

    const btnWidth = maxWidth + 48; // button padding
    const gap = 16; // Tailwind gap-4

    setColumns(
      btnWidth * 4 + gap * 3 <= containerWidth ? 4 : btnWidth * 2 + gap <= containerWidth ? 2 : 1,
    );
  }, [options]);

  useEffect(() => {
    calcCols();
    const obs = new ResizeObserver(calcCols);
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [calcCols]);

  const showFeedback = selectedAnswer !== null && correctAnswerIndexes.length > 0;

  const feedbackVariantStyles = {
    correctRevealed: {
      button: "bg-emerald-100 border-emerald-400 text-emerald-900",
      indicator: "border-emerald-600 bg-emerald-50",
    },
    incorrectSelected: {
      button: "bg-rose-500 border-rose-500 text-white",
      indicator: "border-white bg-white/10",
    },
  };

  const getOptionStyles = (index: number, isSelected: boolean) => {
    const defaultStyles = {
      button: isSelected
        ? "bg-[var(--primary-brand)] text-white border-transparent"
        : "bg-white ui-border-subtle",
      indicator: isSelected ? "border-white" : "ui-border-muted",
    };

    if (!showFeedback) {
      return defaultStyles;
    }

    const isCorrectOption = correctAnswerIndexes.includes(index);

    if (isSelected && isCorrectOption) {
      return {
        button: "bg-emerald-500 border-emerald-500 text-white",
        indicator: "border-white bg-white/10",
      };
    }

    if (isSelected && !isCorrectOption) {
      return feedbackVariantStyles.incorrectSelected;
    }

    if (!isSelected && isCorrectOption) {
      return feedbackVariantStyles.correctRevealed;
    }

    return {
      button: "bg-white ui-border-subtle ui-text-primary opacity-70",
      indicator: "ui-border-muted",
    };
  };

  return (
    <div
      ref={ref}
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {options.map((option, index) => {
        const optionStyles = getOptionStyles(index, selectedAnswer === index);
        return (
          <button
            key={`option-${index}`}
            onClick={() => onAnswerSelect(index)}
            disabled={disabled}
            type="button"
            className={`grid grid-cols-[auto_1fr] items-center gap-3 px-6 py-4 rounded-xl border-2 w-full transition-all focus:outline-none ${optionStyles.button}`}
          >
            <div
              className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${optionStyles.indicator}`}
            >
              {selectedAnswer === index && <div className="w-3 h-3 rounded-full bg-white" />}
            </div>
            <span
              className="text-base text-left"
              style={{
                whiteSpace: columns === 1 ? "normal" : "nowrap",
              }}
            >
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}

