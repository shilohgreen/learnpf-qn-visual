import { Problem } from "@/types/user";
import type { ReactNode } from "react";
import QuestionMedia from "./QuestionMedia";

interface QuestionSectionProps {
  problem: Problem;
  timer: ReactNode;
}

export default function QuestionSection({ problem, timer }: QuestionSectionProps) {
  return (
    <div className="bg-white rounded-2xl p-3 md:p-4 mb-6 shadow-sm text-[color:var(--text-primary)]">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="text-xs font-semibold tracking-wider mb-4">QUESTION</div>
          <h2 className="text-base font-semibold">{problem.content.question}</h2>
        </div>

        {/* Timer display */}
        <div className="ml-4">{timer}</div>
      </div>

      {/* Optional media (image/video) */}
      <QuestionMedia 
        image_path={
          problem.image_path 
            ? (problem.image_path.startsWith('data:') || problem.image_path.startsWith('http'))
              ? problem.image_path 
              : `/images/${problem.image_path}`
            : null
        } 
        video_path={problem.video_path} 
      />

      {/* Question text */}
      <p className="text-base whitespace-pre-line mt-4">{problem.title}</p>
    </div>
  );
}

