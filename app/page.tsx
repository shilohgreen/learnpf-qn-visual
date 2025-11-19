"use client";

import { useState } from "react";
import Navbar from "@/components/about/Navbar";
import ProblemContent from "@/components/ProblemContent";
import type { ProblemType, Problem } from "@/types/user";

export default function Home() {
  const [formData, setFormData] = useState({
    description: "",
    problem_type: "multiple_choice" as ProblemType,
    question: "",
    options: ["", "", "", ""],
    correct_answer: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse correct_answer - try to convert to number if it's a numeric string
    let parsedCorrectAnswer: number | string = formData.correct_answer;
    const numericAnswer = parseInt(formData.correct_answer, 10);
    if (!isNaN(numericAnswer) && formData.correct_answer.trim() === numericAnswer.toString()) {
      parsedCorrectAnswer = numericAnswer;
    }

    // Filter out empty options
    const validOptions = formData.options.filter(opt => opt.trim() !== "");

    // Create Problem object
    const problem: Problem = {
      id: Date.now().toString(),
      title: formData.description || formData.question.substring(0, 50) || "Untitled Problem",
      description: formData.description,
      problem_type: formData.problem_type,
      content: {
        question: formData.question,
        options: validOptions,
        correct_answer: parsedCorrectAnswer,
      },
      image_path: imagePreview || null,
      video_path: null,
      phase: null,
      points: null,
      estimated_duration_minutes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log("[ handleSubmit ] Form submitted:", problem);
    
    // Set the problem to display
    setCurrentProblem(problem);
    setSelectedAnswer(null);
    setProgress(0);
  };

  const handleAnswerSelect = (answer: number | string) => {
    console.log("[ handleAnswerSelect ] Answer selected:", answer);
    setSelectedAnswer(answer);
    setProgress(100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {currentProblem ? (
            <>
              <ProblemContent
                currentProblem={currentProblem}
                progress={progress}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
                formatTime={formatTime}
                timeRemaining={300}
                timerLimit={300}
              />
              <button
                onClick={() => {
                  setCurrentProblem(null);
                  setSelectedAnswer(null);
                  setProgress(0);
                }}
                className="mt-6 w-full bg-gray-200 text-black font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back to Form
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-6">
            {/* Question and Answer Data in Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question Data Fields */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Question Data</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC000]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question
                  </label>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC000]"
                    required
                  />
                </div>
              </div>

              {/* Answer Data Fields */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Answer Data</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Options
                  </label>
                  {formData.options.map((option, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC000]"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correct Answer (index or value)
                  </label>
                  <input
                    type="text"
                    name="correct_answer"
                    value={formData.correct_answer}
                    onChange={handleInputChange}
                    placeholder="e.g., 1 or 'answer text'"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC000]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Upload
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FFC000] file:text-black hover:file:bg-[#FFC000]/90"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-xs h-auto rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#FFC000] text-black font-bold py-3 px-6 rounded-md hover:bg-[#FFC000]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC000] focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
          )}
        </div>
      </main>
    </div>
  );
}
