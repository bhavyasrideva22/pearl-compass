import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Target, BookOpen, Download, Share } from "lucide-react";

interface AssessmentResults {
  overallScore: number;
  sectionScores: Record<string, number>;
  responses: Record<string, string>;
}

interface AssessmentResultsProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getScoreLevel = (score: number) => {
    if (score >= 85) return { level: "Excellent", color: "success", description: "Ready for immediate application" };
    if (score >= 70) return { level: "Strong", color: "info", description: "Minor development needed" };
    if (score >= 55) return { level: "Developing", color: "warning", description: "Focused training recommended" };
    return { level: "Emerging", color: "destructive", description: "Significant development needed" };
  };

  const overallLevel = getScoreLevel(results.overallScore);

  const sections = [
    { key: "decision_making", name: "Decision Making", icon: Target },
    { key: "problem_solving", name: "Problem Solving", icon: TrendingUp },
    { key: "communication", name: "Communication", icon: CheckCircle },
    { key: "adaptability", name: "Adaptability", icon: BookOpen }
  ];

  const recommendations = [
    "Practice scenario-based decision making with time constraints",
    "Develop structured problem-solving frameworks",
    "Strengthen stakeholder communication skills",
    "Build comfort with ambiguous situations"
  ];

  const pearlFramework = {
    P: { name: "Practical Intelligence", score: results.overallScore },
    E: { name: "Execution", score: Math.min(100, results.overallScore + 5) },
    A: { name: "Adaptability", score: Math.max(0, results.overallScore - 3) },
    R: { name: "Reliability", score: Math.min(100, results.overallScore + 2) },
    L: { name: "Learning Agility", score: Math.max(0, results.overallScore - 1) }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-success font-medium">Assessment Complete</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Results</h1>
          <p className="text-muted-foreground text-lg">
            Here's your comprehensive professional readiness assessment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Overall Score */}
          <Card className="lg:col-span-1 p-8 shadow-medium">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-6">Overall Readiness</h2>
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - results.overallScore / 100)}`}
                    className="text-primary transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{results.overallScore}</span>
                </div>
              </div>
              <Badge 
                variant={overallLevel.color === "success" ? "default" : "secondary"}
                className={`mb-4 ${
                  overallLevel.color === "success" ? "bg-success text-success-foreground" :
                  overallLevel.color === "info" ? "bg-info text-info-foreground" :
                  overallLevel.color === "warning" ? "bg-warning text-warning-foreground" :
                  "bg-destructive text-destructive-foreground"
                }`}
              >
                {overallLevel.level}
              </Badge>
              <p className="text-sm text-muted-foreground">{overallLevel.description}</p>
            </div>
          </Card>

          {/* Section Scores */}
          <Card className="lg:col-span-2 p-8 shadow-medium">
            <h2 className="text-2xl font-semibold mb-6">Skill Breakdown</h2>
            <div className="space-y-6">
              {sections.map((section) => {
                const score = Math.round(results.sectionScores[section.key] || results.overallScore);
                const level = getScoreLevel(score);
                return (
                  <div key={section.key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <section.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{section.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{score}/100</span>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            level.color === "success" ? "border-success text-success" :
                            level.color === "info" ? "border-info text-info" :
                            level.color === "warning" ? "border-warning text-warning" :
                            "border-destructive text-destructive"
                          }`}
                        >
                          {level.level}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={score} className="h-3" />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* PEARL Framework */}
        <Card className="mt-8 p-8 shadow-medium">
          <h2 className="text-2xl font-semibold mb-6">PEARL Framework Analysis</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {Object.entries(pearlFramework).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary">{key}</span>
                </div>
                <h3 className="font-medium mb-2">{value.name}</h3>
                <div className="text-2xl font-bold mb-1">{Math.round(value.score)}</div>
                <Progress value={value.score} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="mt-8 p-8 shadow-medium">
          <h2 className="text-2xl font-semibold mb-6">Personalized Development Plan</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Recommended Focus Areas</h3>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Next Steps</h3>
              <div className="space-y-4">
                <div className="bg-gradient-primary p-4 rounded-lg text-white">
                  <h4 className="font-medium mb-2">Immediate Actions (1-2 weeks)</h4>
                  <p className="text-sm opacity-90">
                    Focus on scenario-based practice and structured decision-making frameworks
                  </p>
                </div>
                <div className="bg-gradient-success p-4 rounded-lg text-white">
                  <h4 className="font-medium mb-2">Medium Term (1-2 months)</h4>
                  <p className="text-sm opacity-90">
                    Develop communication templates and practice stakeholder management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Button onClick={onRestart} variant="outline" size="lg">
            Retake Assessment
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Share className="w-4 h-4" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
};