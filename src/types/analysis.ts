export type ResumeAnalysis = {
  id: string;
  resumeFileName: string;
  resumeText?: string;
  jobDescription?: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  atsFeedback: string[];
  improvementSuggestions: string[];
  summarySuggestion: string;
  recommendation: string;
  createdAt: string;
};

export type AnalyzeResumeResponse = {
  message: string;
  data: ResumeAnalysis;
};
