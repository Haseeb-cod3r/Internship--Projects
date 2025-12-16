
import React from "react";
import ScoreGauge from "./ScoreGauge";
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BrainCircuit,
  Briefcase,
} from "./Icons";

const AnalysisView = ({ result, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
    
      <div className="bg-white border rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center">
        <ScoreGauge score={result.overallScore} />

        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-xl font-semibold text-slate-800">
            Resume Analysis
          </h2>
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md font-medium
              ${
                result.matchLevel === "High"
                  ? "bg-green-100 text-green-700"
                  : result.matchLevel === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            <Briefcase className="w-4 h-4" />
            {result.matchLevel} Match
          </span>
          <p className="text-slate-600 text-sm mt-2">{result.summary}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-5">
          <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Strengths
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
            {result.strengths.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border rounded-lg p-5">
          <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Improvements
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
            {result.weaknesses.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

   
      <div className="bg-white border rounded-lg p-5 space-y-4">
        <h3 className="flex items-center gap-2 font-semibold text-slate-800">
          <BrainCircuit className="w-5 h-5 text-blue-600" />
          Skills
        </h3>

        <div>
          <p className="text-xs text-slate-400 mb-2">Technical</p>
          <div className="flex flex-wrap gap-2">
            {result.technicalSkills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 text-sm bg-slate-100 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-2">Soft</p>
          <div className="flex flex-wrap gap-2">
            {result.softSkills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 text-sm bg-indigo-50 text-indigo-700 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-5">
        <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Recommended Actions
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
          {result.improvementPlan.map((plan, i) => (
            <li key={i}>{plan}</li>
          ))}
        </ol>
      </div>

      
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition"
        >
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
};

export default AnalysisView;