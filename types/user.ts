// Simplified Problem type for the demo
export type ProblemType = "multiple_choice" | "single_choice" | "content";

export interface Problem {
  id: string;
  title: string;
  description: string;
  problem_type: ProblemType;
  content: {
    question: string;
    options: string[];
    correct_answer: number | number[] | string;
    explanation?: string;
    hint?: string;
  };
  image_path?: string | null;
  video_path?: string | null;
  phase?: string | null;
  points?: number | null;
  estimated_duration_minutes?: number | null;
  created_at: string;
  updated_at: string;
}

