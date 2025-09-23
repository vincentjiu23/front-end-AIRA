// ResultDiagnosis.tsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type ModelInfo = {
  model_name: string;
  loaded: boolean;
  model_type: string;
  scaler: string;
  num_features: number;
  cancer_type: string;
};

type StatusResponse = {
  status: string;
  models_loaded: number;
  models_total: number;
  models: ModelInfo[];
};

const ResultDiagnosis: React.FC = () => {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [rawText, setRawText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use VITE_ prefixed env if available; fallback to the known IP (explicit).
  const BASE =
    (import.meta.env.VITE_AI_BACKEND_URL as string | undefined) ??
    (import.meta.env.AI_BACKEND_URL as string | undefined) ?? // unlikely in Vite, kept as extra fallback
    "http://103.217.145.170/";

  const endpoint = (() => {
    try {
      // ensure proper concatenation even if BASE ends/doesn't end with '/'
      return new URL("/ai/status", BASE).toString();
    } catch {
      // if BASE is relative or malformed, fallback to absolute
      return `${BASE.replace(/\/$/, "")}/ai/status`;
    }
  })();

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    setRawText(null);

    try {
      const res = await fetch(endpoint, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
        },
      });

      // Debugging - inspect response headers & status in console
      console.log("[ResultDiagnosis] fetch", endpoint);
      console.log("[ResultDiagnosis] status:", res.status, res.statusText);
      console.log("[ResultDiagnosis] headers:", [...res.headers.entries()]);

      if (!res.ok) {
        // try to read body for more info
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${res.statusText}\n${txt}`);
      }

      const contentType = (res.headers.get("content-type") || "").toLowerCase();
      const text = await res.text(); // read raw text first

      // If the content-type explicitly JSON, parse it; otherwise try JSON.parse and fallback to raw text
      if (contentType.includes("application/json")) {
        const json = JSON.parse(text) as StatusResponse;
        setData(json);
      } else {
        // try to parse JSON even if content-type not set
        try {
          const json = JSON.parse(text) as StatusResponse;
          setData(json);
        } catch {
          // not JSON -> show raw text so you can see the HTML/error page
          setRawText(text);
          console.warn("[ResultDiagnosis] Response is not JSON, raw text set");
        }
      }
    } catch (err: any) {
      console.error("[ResultDiagnosis] fetch error:", err);
      // Common browser CORS/network error may appear as TypeError: Failed to fetch
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError(
          "Network error / CORS blocked / server unreachable. Check backend, browser console and that VITE_AI_BACKEND_URL is correct."
        );
      } else {
        setError(err.message ?? String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">


      <main className="flex flex-col items-center px-6 py-10 gap-6 flex-1">
        <h2 className="text-2xl font-bold text-blue-900">Diagnosis result</h2>
        <p className="text-gray-600">Your Diagnosis result</p>

        <div className="w-full max-w-4xl border border-gray-300 rounded-lg bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="text-sm text-gray-600">
              Endpoint: <code className="text-xs font-mono">{endpoint}</code>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchStatus}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
              >
                Refresh
              </button>
              <span className="text-sm text-gray-500">
                {loading ? "Loading..." : error ? "Error" : data ? "OK" : rawText ? "Raw response" : "No data"}
              </span>
            </div>
          </div>

          {/* Content area */}
          <div className="h-64 overflow-auto p-2 bg-gray-50 rounded">
            {error ? (
              <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>
            ) : data ? (
              // Render structured HTML view of the expected JSON
              <div className="space-y-4 text-sm text-gray-800">
                <div>
                  <strong className="mr-2">Status:</strong>
                  <span className="text-indigo-700 font-semibold">{data.status}</span>
                </div>
                <div>
                  <strong className="mr-2">Models loaded:</strong>
                  {data.models_loaded} / {data.models_total}
                </div>

                <div className="overflow-auto">
                  <table className="w-full table-fixed text-left text-sm border-collapse">
                    <thead>
                      <tr className="text-xs text-gray-600">
                        <th className="p-2 w-1/4">Model</th>
                        <th className="p-2 w-1/6">Loaded</th>
                        <th className="p-2 w-1/6">Type</th>
                        <th className="p-2 w-1/6">Scaler</th>
                        <th className="p-2 w-1/6"># Features</th>
                        <th className="p-2 w-1/6">Cancer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.models.map((m) => (
                        <tr key={m.model_name} className="border-t">
                          <td className="p-2">{m.model_name}</td>
                          <td className="p-2">{m.loaded ? "✅" : "❌"}</td>
                          <td className="p-2">{m.model_type}</td>
                          <td className="p-2">{m.scaler}</td>
                          <td className="p-2">{m.num_features}</td>
                          <td className="p-2">{m.cancer_type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : rawText ? (
              // show raw text (HTML or plain text) for debugging
              <pre className="whitespace-pre-wrap text-sm text-gray-800">{rawText}</pre>
            ) : (
              <div className="text-sm text-gray-500">No response yet. Click Refresh to retry.</div>
            )}
          </div>
        </div>

        <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
          Extract into PDF
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default ResultDiagnosis;
