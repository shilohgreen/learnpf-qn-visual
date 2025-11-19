"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/lessons/intuition/ProgressBar";
import Timer from "@/components/lessons/intuition/Timer";
import AnswerSection from "@/components/lessons/shared/AnswerSection";
import QuestionSection from "@/components/lessons/shared/QuestionSection";
import type { Problem } from "@/types/user";

interface ProblemContentProps {
  currentProblem: Problem | null;
  progress?: number;
  selectedAnswer?: number | string | null;
  timeRemaining?: number;
  onAnswerSelect?: (answer: number | string) => void;
  formatTime?: ((seconds: number) => string) | null;
  timerLimit?: number;
  initialProgress?: number;
  initialSelectedAnswer?: number | string | null;
}

export default function ProblemContent({
  currentProblem,
  progress: externalProgress,
  selectedAnswer: externalSelectedAnswer,
  timeRemaining = 0,
  onAnswerSelect: externalOnAnswerSelect,
  formatTime = null,
  timerLimit = 0,
  initialProgress = 0,
  initialSelectedAnswer = null,
}: ProblemContentProps) {
  // Internal state management
  const [internalProgress, setInternalProgress] = useState(initialProgress);
  const [internalSelectedAnswer, setInternalSelectedAnswer] = useState<number | string | null>(
    initialSelectedAnswer,
  );

  // Use external state if provided, otherwise use internal state
  const progress = externalProgress !== undefined ? externalProgress : internalProgress;
  const selectedAnswer =
    externalSelectedAnswer !== undefined ? externalSelectedAnswer : internalSelectedAnswer;

  // Reset state when problem changes
  useEffect(() => {
    if (currentProblem) {
      setInternalSelectedAnswer(null);
      setInternalProgress(0);
    }
  }, [currentProblem]);

  // Internal answer selection handler
  const handleInternalAnswerSelect = (answer: number | string) => {
    setInternalSelectedAnswer(answer);
    if (externalOnAnswerSelect) {
      externalOnAnswerSelect(answer);
    }
  };

  // Use external handler if provided, otherwise use internal handler
  const handleAnswerSelect = externalOnAnswerSelect || handleInternalAnswerSelect;

  return (
    <>
      {/* Navigation controls and progress bar */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <ProgressBar percentage={progress} width="w-full" height="h-2" />
      </div>

      {/* Current question and answers */}
      {currentProblem && (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex-1">
            <QuestionSection
              problem={currentProblem}
              timer={
                formatTime && (
                  <Timer
                    timeRemaining={timeRemaining}
                    formatTime={formatTime}
                    timerLimit={timerLimit}
                  />
                )
              }
            />
          </div>
          <div className="flex-1">
            <AnswerSection
              problem={currentProblem}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
            />
          </div>
        </div>
      )}
    </>
  );
}

