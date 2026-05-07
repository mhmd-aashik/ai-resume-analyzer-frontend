import axios from "axios";
import type { AnalyzeResumeResponse, ResumeAnalysis, PaginatedHistoryResponse } from "@/types/analysis";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

export async function analyzeResumeApi(params: {
  resume: File;
  jobDescription: string;
}) {
  const formData = new FormData();
  formData.append("resume", params.resume);
  formData.append("jobDescription", params.jobDescription);

  const response = await api.post<AnalyzeResumeResponse>(
    "/resume/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

export async function getAnalysesApi(limit = 10, offset = 0) {
  const response = await api.get<PaginatedHistoryResponse>(
    `/resume/history?limit=${limit}&offset=${offset}`,
  );
  return response.data;
}

export async function getAnalysisByIdApi(id: string) {
  const response = await api.get<ResumeAnalysis>(`/resume/${id}`);
  return response.data;
}
