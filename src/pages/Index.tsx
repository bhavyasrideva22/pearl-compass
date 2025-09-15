import { useState } from "react";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";

type AssessmentState = "intro" | "assessment" | "results";

interface AssessmentResults {
  overallScore: number;
  sectionScores: Record<string, number>;
  responses: Record<string, string>;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AssessmentState>("intro");
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const handleStart = () => {
    setCurrentState("assessment");
  };

  const handleComplete = (assessmentResults: AssessmentResults) => {
    setResults(assessmentResults);
    setCurrentState("results");
  };

  const handleRestart = () => {
    setResults(null);
    setCurrentState("intro");
  };

  return (
    <>
      {currentState === "intro" && <AssessmentIntro onStart={handleStart} />}
      {currentState === "assessment" && <AssessmentFlow onComplete={handleComplete} />}
      {currentState === "results" && results && (
        <AssessmentResults results={results} onRestart={handleRestart} />
      )}
    </>
  );
};

export default Index;
