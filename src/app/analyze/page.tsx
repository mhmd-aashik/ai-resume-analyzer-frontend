import ResumeUploadForm from "@/components/resume/resume-upload-form";

export default function AnalyzePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-300">AI Resume Analyzer</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Upload resume and analyze job fit
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Compare your resume against a job description and get AI-powered
          feedback in seconds.
        </p>
      </div>

      <ResumeUploadForm />
    </main>
  );
}
