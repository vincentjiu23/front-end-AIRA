import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const UploadDiagnosis: React.FC = () => {
  const { cancerSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_AI_BACKEND_URL;

  const { cancerName, datasetLabel } = location.state || {};

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [rawResponse, setRawResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [loadingTime, setLoadingTime] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const handleSubmit = async () => {
    setErrorMessage('');
    setRawResponse('');
    setIsLoading(true);
    setLoadingTime(0);
    setProgressPercent(0);

    if (!cancerSlug || !datasetLabel || !uploadedFile) {
      setErrorMessage('❗ Missing required fields. Please complete all selections and upload a file.');
      setIsLoading(false);
      return;
    }

    if (uploadedFile.type !== 'text/csv') {
      setErrorMessage('❌ Invalid file type. Please upload a .csv file.');
      setIsLoading(false);
      return;
    }

    const url = `${baseUrl}/cancers/${cancerSlug}/predict`;
    const formData = new FormData();
    formData.append('ai_feature', 'diagnosis');
    formData.append('feature_key', datasetLabel);
    formData.append('file', uploadedFile);

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setLoadingTime(elapsed);
      setProgressPercent(Math.min(100, (elapsed / 10000) * 100));
    }, 500);

    try {
      const res = await fetch(url, { method: 'POST', body: formData });
      const text = await res.text();
      clearInterval(timer);
      setProgressPercent(100);
      setIsLoading(false);
      setRawResponse(text);

      if (!res.ok) {
        if (text.includes('Invalid CSV') || text.toLowerCase().includes('format')) {
          setErrorMessage('❌ Invalid dataset format. Please upload a valid .csv file with correct headers.');
        } else {
          setErrorMessage(text || '❌ Server error occurred.');
        }
        return;
      }

      try {
        const result = JSON.parse(text);
        navigate('/result-diagnosis', {
          state: { predictionResult: result, cancerName, datasetLabel },
        });
      } catch {
        setErrorMessage('⚠️ Backend returned invalid JSON. Raw response shown below.');
      }
    } catch (err: any) {
      clearInterval(timer);
      setErrorMessage(err.message || '❌ Failed to submit prediction');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#eaeefc] transition-all duration-300">
      {/* Loading Popup */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full bg-white text-[#191757] text-sm py-3 px-4 shadow-md z-50 transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="font-medium">⏳ Generating diagnosis result...</span>
            <span className="text-xs italic text-gray-600">
              Elapsed: {Math.floor(loadingTime / 1000)}s
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#191757] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      <main className="flex flex-1 items-center justify-center py-12 px-6">
        <div className="bg-white rounded-xl shadow-2xl border border-[#d6d6f0] p-10 w-full max-w-5xl animate-fade-in">
          <h2 className="text-4xl font-bold text-[#191757] text-center mb-4">Upload Dataset</h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Upload input dataset file for diagnosis prediction
          </p>

          {/* Upload Section */}
          <div className="space-y-6">
            <div className="text-sm text-gray-700 bg-[#f0f4ff] p-4 rounded-lg border border-[#cdd5f5]">
              <p><strong>Cancer Type:</strong> {cancerName || 'Unknown'}</p>
              <p><strong>AI Feature:</strong> Diagnosis</p>
              <p><strong>Dataset Key:</strong> {datasetLabel || 'No dataset added here'}</p>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-[#191757]">Upload File (.csv)</label>
              <div className="border-2 border-dashed border-[#b0b0d0] rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="fileUpload"
                />
                <label htmlFor="fileUpload" className="cursor-pointer block text-[#191757] font-medium">
                  Click to browse or drag and drop files here
                </label>
                {uploadedFile && (
                  <p className="mt-2 text-sm text-gray-600">{uploadedFile.name}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Only .csv files are supported. Make sure the file is properly formatted.
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-600 text-sm text-center whitespace-pre-wrap animate-pulse">
                {errorMessage}
              </div>
            )}

            {/* Buttons Centered */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-300 text-black font-semibold rounded-lg shadow hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#191757] text-white font-semibold rounded-lg shadow hover:bg-[#2a2a7f] transition disabled:opacity-50"
                disabled={!uploadedFile}
              >
                Continue
              </button>
            </div>
          </div>

          {/* Raw Response (Invalid JSON Fallback) */}
          {rawResponse && (
            <div className="mt-8 p-4 border rounded bg-red-50 shadow animate-fade-in">
              <h3 className="font-semibold mb-2 text-red-700">Raw Server Response</h3>
              <pre className="text-sm text-red-800 whitespace-pre-wrap">{rawResponse}</pre>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadDiagnosis;
