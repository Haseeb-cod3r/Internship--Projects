import React, { useState, useRef } from "react";
import {
  FileText,
  Loader2,
  X,
} from "./components/Icons";
import { analyzeResume } from "./services/geminiService";
import { fileToBase64, formatFileSize } from "./utils/fileHelpers";
import { AppState } from "./type";
import AnalysisView from "./components/AnalysisView";
import brain from "./assets/images/cloud-computing.png";

const App = () => {
  const [appState, setAppState] = useState(AppState.IDLE);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file) => {
    const validTypes = ["application/pdf", "text/plain"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF or TXT file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setUploadedFile({
        file,
        preview: file.name,
        base64,
        mimeType: file.type,
      });
      setError(null);
    } catch (err) {
      setError("Failed to process file.");
      console.error(err);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setAppState(AppState.ANALYZING);
    try {
      const data = await analyzeResume(
        uploadedFile.base64,
        uploadedFile.mimeType,
        jobDescription
      );
      setResult(data);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      setAppState(AppState.ERROR);
      setError(
        "An error occurred during AI analysis. Please check your API key and try again."
      );
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setUploadedFile(null);
    setResult(null);
    setJobDescription("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 p-1">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
        {appState === AppState.SUCCESS && result ? (
          <AnalysisView result={result} onReset={handleReset} />
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Optimize your resume with{" "}
                <span className="text-green-600">AI Intelligence</span>
              </h1>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-8 md:p-12 space-y-8">
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 group
                    ${
                      uploadedFile
                        ? "border-green-400"
                        : "border-slate-300 hover:border-green-400"
                    }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.txt"
                  />

                  {!uploadedFile ? (
                    <div
                      className="space-y-4 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                        <img src={brain} alt="" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-slate-800">
                          Upload your resume
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                          <FileText size={24} />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-slate-800 truncate max-w-[200px]">
                            {uploadedFile.file.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatFileSize(uploadedFile.file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                        }}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="jd"
                    className="block text-sm font-semibold text-slate-700 mb-2 flex justify-center"
                  >
                    Job Description (Optional)
                  </label>
                  <textarea
                    id="jd"
                    rows={4}
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-green-400 transition-all resize-none"
                    placeholder="Paste the job description here for targeted analysis..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-2">
                    <X size={16} />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={!uploadedFile || appState === AppState.ANALYZING}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2
                    ${
                      !uploadedFile || appState === AppState.ANALYZING
                        ? "bg-slate-900 hover:bg-slate-800 shadow-slate-200 cursor-not-allowed"
                        : "bg-slate-900 hover:bg-slate-800 shadow-slate-200"
                    }`}
                >
                  {appState === AppState.ANALYZING ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>Analyze Resume</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
