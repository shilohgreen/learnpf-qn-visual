"use client";

import type { Problem } from "@/types/user";
import MultipleChoiceAnswer from "./answers/MultipleChoiceAnswer";

interface AnswerSectionProps {
  problem: Problem;
  selectedAnswer: number | string | null;
  onAnswerSelect: (answer: number | string) => void;
}

/**
 * Renders the appropriate answer input component based on problem type.
 */
export default function AnswerSection({
  problem,
  selectedAnswer,
  onAnswerSelect,
}: AnswerSectionProps) {
  // Should be a better way to handle correct option indexes, but this works for now
  // Issue is correct answer can be array of numbers, single number or string
  // To fix this when we have a wider range of problem types, we should use a more robust solution
  const getCorrectOptionIndexes = () => {
    const content = problem.content;
    const rawValue = content.correct_answer;

    if (Array.isArray(rawValue)) {
      return rawValue.filter((item): item is number => typeof item === "number");
    }

    if (typeof rawValue === "number") {
      return [rawValue];
    }

    return [];
  };

  const correctAnswerIndexes = getCorrectOptionIndexes();

  const handleAnswerSelect = (answer: number | string) => {
    onAnswerSelect(answer);
  };

  const renderAnswerView = () => {
    switch (problem.problem_type) {
      case "multiple_choice":
      case "single_choice":
      case "content":
        return (
          <MultipleChoiceAnswer
            options={problem.content.options}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            disabled={selectedAnswer != null}
            correctAnswerIndexes={correctAnswerIndexes}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="text-xs font-semibold tracking-wider mb-4">ANSWERS</div>
      {renderAnswerView()}
    </div>
  );
}

