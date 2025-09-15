import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Brain, Target, Clock, Lightbulb } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  const features = [
    {
      icon: Brain,
      title: "Scenario-Based Learning",
      description: "Real-world situations that test practical decision-making"
    },
    {
      icon: Target,
      title: "Skills Assessment", 
      description: "Evaluate hands-on execution in job-relevant tasks"
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Assess prioritization and productivity habits"
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Break down and resolve workplace challenges"
    }
  ];

  const benefits = [
    "Get personalized insights into your professional readiness",
    "Identify specific skills to develop for career growth", 
    "Receive a detailed improvement plan tailored to you",
    "Match your profile to suitable roles and opportunities"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Professional Assessment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Adaptive Decision Maker
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            An Applied Skills & Real-World Readiness Assessment designed to measure your 
            practical, on-the-job readiness through real-world scenarios and decision-making challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Assessment Overview */}
          <Card className="p-8 shadow-medium">
            <h2 className="text-2xl font-semibold mb-6">What You'll Experience</h2>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* What You'll Get */}
          <Card className="p-8 shadow-medium">
            <h2 className="text-2xl font-semibold mb-6">What You'll Receive</h2>
            <div className="space-y-4 mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-primary p-6 rounded-lg text-white">
              <h3 className="font-semibold mb-2">Assessment Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Duration</div>
                  <div className="opacity-90">~25 minutes</div>
                </div>
                <div>
                  <div className="font-medium">Sections</div>
                  <div className="opacity-90">6 modules</div>
                </div>
                <div>
                  <div className="font-medium">Questions</div>
                  <div className="opacity-90">Mixed format</div>
                </div>
                <div>
                  <div className="font-medium">Results</div>
                  <div className="opacity-90">Instant feedback</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="inline-block p-8 shadow-large">
            <h2 className="text-2xl font-semibold mb-4">Ready to Begin?</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Discover your professional readiness and get personalized recommendations 
              for your career growth.
            </p>
            <Button 
              onClick={onStart}
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg"
            >
              Start Assessment
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              No registration required • Instant results • Completely free
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};