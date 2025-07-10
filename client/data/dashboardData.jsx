import { BrainCircuit, Briefcase, ScrollText } from "lucide-react";

export const dashboardData = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "Cover-Letter",
    description:
      "Get personalized career advice, tailored Cover-Letter and insights powered by advanced AI technology.",
    link: "/cover-Letter",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
    title: "Interview Preparation",
    description:
      "Practice with role-specific questions and get instant feedback to improve your performance.",
    link: "/interview-prep"
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance.",
    link: "/resume-builder"
  },
];