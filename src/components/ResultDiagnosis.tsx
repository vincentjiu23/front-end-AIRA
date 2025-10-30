import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

type PredictionResult = {
  prediction: number; // 0 = early, 1 = advanced
  probability?: number;
  top_features?: Array<{ name: string; importance: number }>;
};

const ResultDiagnosis: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    predictionResult,
    cancerName,
    datasetLabel,
  } = (location.state as {
    predictionResult?: PredictionResult;
    cancerName?: string;
    datasetLabel?: string;
  }) || {};

  if (!predictionResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-black">
        <p className="text-red-600 text-lg font-semibold">
          No prediction data found. Please upload a dataset first.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>
    );
  }

  const isAdvanced = predictionResult.prediction === 1;
  const stageLabel = isAdvanced
    ? 'Advanced stage (likely stage III–IV patterns)'
    : 'Early stage (likely stage I–II patterns)';
  const confidence =
    typeof predictionResult.probability === 'number'
      ? `${(predictionResult.probability * 100).toFixed(2)}%`
      : 'N/A';

  const summary = isAdvanced
    ? `AI suggests patterns consistent with advanced ${cancerName || 'cancer'}: features in the dataset (e.g., marker expression, structural signatures) align with more progressed disease, including possible regional lymph node involvement or distant spread. This implies higher tumor burden and molecular complexity.`
    : `AI suggests early-stage ${cancerName || 'cancer'} indicators: abnormalities appear localized with fewer high-risk molecular signals. Early detection increases the chance of curative local therapy and less aggressive systemic therapy if confirmed.`;

  const interpretation = isAdvanced
    ? [
        'Key interpretation points:',
        '- Higher likelihood of lymph node involvement and/or distant metastasis patterns.',
        '- Increased genomic complexity and/or biomarker expression correlated with reduced responsiveness to local therapy only.',
        '- Prognostic implication: comprehensive staging workup and multidisciplinary management strongly advised.'
      ].join('\n')
    : [
        'Key interpretation points:',
        '- Findings suggest localized disease patterns with lower tumor burden signals.',
        '- Molecular profile may reveal actionable targets for organ-preserving approaches.',
        '- Prognostic implication: higher chance of curative outcome when detected early.'
      ].join('\n');

  const recommendedAction = isAdvanced
    ? `Immediate comprehensive evaluation by oncology team: imaging (CT / PET-CT), biopsy confirmation, pathology (IHC + molecular profiling), and tumor board discussion (medical, radiation, surgical oncology). This determines eligibility for systemic therapy (chemotherapy, immunotherapy, targeted therapy). Despite high AI confidence (${confidence}), all results must be validated by clinicians.`
    : `Prompt confirmatory diagnostics: imaging and pathology confirmation, grading, and molecular testing if indicated. Early intervention (surgery or focused radiotherapy) is often curative at this stage. Always confirm diagnosis with specialists before deciding any treatment plan.`;

  const renderTopFeatures = () => {
    if (!predictionResult.top_features || predictionResult.top_features.length === 0) return null;
    return (
      <div className="mt-4 text-black">
        <h5 className="font-semibold mb-2">Top contributing features (model):</h5>
        <ul className="list-disc list-inside text-sm">
          {predictionResult.top_features.map((f, idx) => (
            <li key={idx}>
              {f.name} — importance: {f.importance.toFixed(3)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#eef2ff] text-black">
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-6xl mx-auto text-black">
          <h1 className="text-3xl font-bold text-center mb-4">AI-Assisted Diagnostic Report</h1>

          <div className="mb-6 p-4 rounded-lg bg-[#f1f7ff] border text-black">
            <p><strong>Cancer type:</strong> {cancerName || 'Unknown'}</p>
            <p><strong>Dataset:</strong> {datasetLabel || 'N/A'}</p>
            <p><strong>Predicted stage (model):</strong> {stageLabel}</p>
            <p><strong>Model confidence:</strong> {confidence}</p>
          </div>

          <section className="grid md:grid-cols-2 gap-6 text-black">
            <article className="p-4 border rounded-lg bg-white">
              <h3 className="font-semibold text-lg mb-2">Comprehensive Summary</h3>
              <p className="text-sm whitespace-pre-line leading-relaxed">{summary}</p>

              <div className="mt-4">
                <h4 className="font-semibold">Detailed Interpretation</h4>
                <pre className="text-sm whitespace-pre-line bg-gray-50 p-3 rounded text-black">
                  {interpretation}
                </pre>
              </div>

              {renderTopFeatures()}
            </article>

            <article className="p-4 border rounded-lg bg-white text-black">
              <h3 className="font-semibold text-lg mb-2">Recommended Clinical Pathway</h3>
              <ol className="list-decimal list-inside text-sm space-y-2">
                <li><strong>Biopsy confirmation:</strong> Pathologic verification and grading.</li>
                <li><strong>Staging imaging:</strong> CT/MRI/PET-CT to define disease extent (T/N/M).</li>
                <li><strong>Molecular testing:</strong> Evaluate genomic and receptor markers for therapy options.</li>
                <li><strong>Tumor board review:</strong> Multidisciplinary team defines optimal treatment plan.</li>
                <li><strong>Supportive assessment:</strong> Organ function, fertility counseling, psychological support.</li>
              </ol>
              <p className="mt-4 text-xs">
                <strong>Note:</strong> AI assists clinical judgment but never replaces direct physician evaluation.
              </p>
            </article>
          </section>

          <section className="mt-6 p-4 border rounded-lg bg-[#fbfbff] text-black">
            <h3 className="font-semibold text-lg mb-2">Diagnostic Checklist (Table)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse text-black">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left border">Step</th>
                    <th className="p-2 text-left border">Purpose</th>
                    <th className="p-2 text-left border">Responsible</th>
                    <th className="p-2 text-left border">Typical Tests</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Clinical evaluation</td>
                    <td className="p-2 border">Assess symptoms & physical signs</td>
                    <td className="p-2 border">Oncologist / Physician</td>
                    <td className="p-2 border">Physical exam, blood work</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Tissue diagnosis</td>
                    <td className="p-2 border">Confirm histology & malignancy</td>
                    <td className="p-2 border">Pathologist</td>
                    <td className="p-2 border">Biopsy, IHC</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Staging imaging</td>
                    <td className="p-2 border">Determine spread (T/N/M)</td>
                    <td className="p-2 border">Radiologist</td>
                    <td className="p-2 border">CT, MRI, PET-CT</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Molecular profiling</td>
                    <td className="p-2 border">Guide personalized therapy</td>
                    <td className="p-2 border">Molecular Lab</td>
                    <td className="p-2 border">NGS, PCR, Liquid Biopsy</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Tumor board</td>
                    <td className="p-2 border">Formulate final treatment</td>
                    <td className="p-2 border">Multidisciplinary team</td>
                    <td className="p-2 border">Treatment planning</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6 p-4 border rounded-lg bg-white text-black">
            <h3 className="font-semibold text-lg mb-2">Follow-up Algorithm</h3>
            <div className="flex justify-center">
              <svg width="720" height="180" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`.b{fill:#fff;stroke:#000;stroke-width:1.5}.t{font:12px sans-serif;fill:#000}`}</style>
                </defs>
                <rect x="20" y="20" width="200" height="40" rx="8" className="b" />
                <text x="120" y="45" textAnchor="middle" className="t">AI Result Received</text>
                <rect x="260" y="10" width="200" height="60" rx="8" className="b" />
                <text x="360" y="40" textAnchor="middle" className="t">Pathology Confirmation</text>
                <rect x="500" y="10" width="200" height="60" rx="8" className="b" />
                <text x="600" y="40" textAnchor="middle" className="t">Staging Imaging</text>
                <rect x="260" y="90" width="200" height="60" rx="8" className="b" />
                <text x="360" y="120" textAnchor="middle" className="t">Molecular Profiling</text>
                <rect x="500" y="90" width="200" height="60" rx="8" className="b" />
                <text x="600" y="120" textAnchor="middle" className="t">Tumor Board Plan</text>
                <line x1="220" y1="40" x2="260" y2="40" stroke="#000" strokeWidth="1.5" />
                <line x1="460" y1="40" x2="500" y2="40" stroke="#000" strokeWidth="1.5" />
                <line x1="360" y1="70" x2="360" y2="90" stroke="#000" strokeWidth="1.5" />
                <line x1="360" y1="120" x2="500" y2="120" stroke="#000" strokeWidth="1.5" />
              </svg>
            </div>
          </section>

          <div className="mt-6 p-4 rounded-lg bg-[#fff7f7] border text-black">
            <h3 className="font-semibold">Most Recommended Action</h3>
            <p className="text-sm">{recommendedAction}</p>
            <p className="text-xs mt-3">
              <strong>Clinical Reminder:</strong> Only licensed clinicians can interpret and confirm cancer diagnosis. This AI output assists triage and prioritization.
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultDiagnosis;
