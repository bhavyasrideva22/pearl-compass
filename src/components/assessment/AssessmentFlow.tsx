import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, Clock, ArrowRight, ArrowLeft } from "lucide-react";

interface AssessmentFlowProps {
  onComplete: (results: AssessmentResults) => void;
}

interface AssessmentResults {
  overallScore: number;
  sectionScores: Record<string, number>;
  responses: Record<string, string>;
}

const scenarios = [
  {
    id: "missed_email",
    title: "The Missed Email",
    description: "You discover a key stakeholder didn't receive a deliverable due to your oversight. The deadline was today, and your manager is unavailable.",
    question: "What do you do first?",
    options: [
      { id: "A", text: "Resend the deliverable and CC your manager", score: 85 },
      { id: "B", text: "Call the stakeholder and acknowledge the issue", score: 95 },
      { id: "C", text: "Wait to inform your manager first", score: 30 },
      { id: "D", text: "Ask the team if anyone can explain what happened", score: 45 }
    ]
  },
  {
    id: "system_outage",
    title: "Unexpected System Outage", 
    description: "You're responsible for client onboarding. The CRM is down, and a high-value client is waiting for next steps.",
    question: "What's your best course of action?",
    options: [
      { id: "A", text: "Wait for IT to fix it", score: 25 },
      { id: "B", text: "Move to a manual process", score: 90 },
      { id: "C", text: "Cancel the onboarding session", score: 15 },
      { id: "D", text: "Tell the client to reschedule", score: 40 }
    ]
  },
  {
    id: "conflicting_priorities",
    title: "Conflicting Priorities",
    description: "Your team lead gives you a high-priority task. Simultaneously, a senior executive emails you with a request due by end of day.",
    question: "How do you handle this?",
    options: [
      { id: "A", text: "Focus on the executive's request first", score: 60 },
      { id: "B", text: "Contact both to clarify priorities and timelines", score: 95 },
      { id: "C", text: "Work on the team lead's task as assigned", score: 70 },
      { id: "D", text: "Try to complete both without asking questions", score: 40 }
    ]
  },
  {
    id: "unclear_feedback",
    title: "Unclear Feedback",
    description: "You complete a task and receive vague feedback: 'This isn't what I expected.'",
    question: "What's your next step?",
    options: [
      { id: "A", text: "Ask specific questions about what needs to change", score: 95 },
      { id: "B", text: "Guess what they meant and revise", score: 30 },
      { id: "C", text: "Request a meeting to discuss expectations", score: 85 },
      { id: "D", text: "Look at similar past work for guidance", score: 60 }
    ]
  },
  {
    id: "tight_timeline",
    title: "Tight Timeline Decision",
    description: "You're leading a short project. A team member wants to switch tools mid-way, claiming it'll improve outcomes. You're 2 days from the deadline.",
    question: "What do you decide?",
    options: [
      { id: "A", text: "Stick with current tools to avoid risk", score: 80 },
      { id: "B", text: "Evaluate the risk vs. benefit quickly", score: 90 },
      { id: "C", text: "Let the team member proceed independently", score: 45 },
      { id: "D", text: "Switch tools for future projects only", score: 70 }
    ]
  },
  {
    id: "process_breakdown", 
    title: "Process Breakdown",
    description: "The usual escalation path fails, and a client issue is getting worse. You're not sure who owns the next step.",
    question: "What's your most effective move?",
    options: [
      { id: "A", text: "Take ownership and find a solution path", score: 95 },
      { id: "B", text: "Keep escalating until someone responds", score: 60 },
      { id: "C", text: "Document the issue and wait for guidance", score: 35 },
      { id: "D", text: "Inform the client about the process delay", score: 75 }
    ]
  }
];

export const AssessmentFlow = ({ onComplete }: AssessmentFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [timeStarted] = useState(Date.now());

  const progress = ((currentStep + 1) / scenarios.length) * 100;
  const currentScenario = scenarios[currentStep];

  const handleAnswer = (answer: string) => {
    const newResponses = { ...responses, [currentScenario.id]: answer };
    setResponses(newResponses);

    if (currentStep < scenarios.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // Calculate results
      const results = calculateResults(newResponses);
      setTimeout(() => onComplete(results), 300);
    }
  };

  const calculateResults = (responses: Record<string, string>): AssessmentResults => {
    let totalScore = 0;
    let responseCount = 0;

    scenarios.forEach(scenario => {
      const response = responses[scenario.id];
      if (response) {
        const option = scenario.options.find(opt => opt.id === response);
        if (option) {
          totalScore += option.score;
          responseCount++;
        }
      }
    });

    const overallScore = responseCount > 0 ? Math.round(totalScore / responseCount) : 0;

    return {
      overallScore,
      sectionScores: {
        "decision_making": overallScore,
        "problem_solving": overallScore + Math.random() * 10 - 5,
        "communication": overallScore + Math.random() * 10 - 5,
        "adaptability": overallScore + Math.random() * 10 - 5,
      },
      responses
    };
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Assessment in Progress</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Question {currentStep + 1} of {scenarios.length}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="max-w-4xl mx-auto p-8 shadow-medium">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-4">
              <span className="text-primary text-sm font-medium">Scenario {currentStep + 1}</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">{currentScenario.title}</h2>
            <div className="bg-muted/50 p-6 rounded-lg mb-6">
              <p className="text-foreground leading-relaxed">{currentScenario.description}</p>
            </div>
            <h3 className="text-lg font-medium mb-4">{currentScenario.question}</h3>
          </div>

          <RadioGroup 
            value={responses[currentScenario.id] || ""} 
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentScenario.options.map((option) => (
              <div key={option.id} className="flex items-start space-x-3">
                <RadioGroupItem 
                  value={option.id} 
                  id={option.id}
                  className="mt-1"
                />
                <Label 
                  htmlFor={option.id} 
                  className="flex-1 cursor-pointer p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-medium text-primary bg-primary/10 px-2 py-1 rounded text-sm">
                      {option.id}
                    </span>
                    <span className="leading-relaxed">{option.text}</span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={goBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {responses[currentScenario.id] ? (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-4 h-4" />
                  Answer recorded
                </div>
              ) : (
                "Select an answer to continue"
              )}
            </div>

            <div className="w-24" /> {/* Spacer for layout balance */}
          </div>
        </Card>
      </div>
    </div>
  );
};