import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// General
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";

// Diagnosis
import DiagnosisSection from "./components/DiagnosisSection";
import UploadDiagnosis from "./components/UploadDiagnosis";
import UploadDiagnosisMulti from "./components/UploadDiagnosisMulti";
import ResultDiagnosis from "./components/ResultDiagnosis";

// Prognosis
import PrognosisSection from "./components/PrognosisSection";
import UploadPrognosis from "./components/UploadPrognosis";
import UploadPrognosisMulti from "./components/UploadPrognosisMulti";
import ResultPrognosis from "./components/ResultPrognosis";

// Treatment
import TreatmentSection from "./components/TreatmentSection";
import UploadTreatment from "./components/UploadTreatment";
import UploadTreatmentMulti from "./components/UploadTreatmentMulti";
import ResultTreatment from "./components/ResultTreatment";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Diagnosis Routes */}
        <Route path="/diagnosis" element={<DiagnosisSection />} />
        <Route path="/upload/diagnosis" element={<UploadDiagnosis />} />
        <Route path="/upload/diagnosis/multi" element={<UploadDiagnosisMulti />} />
        <Route path="/result/diagnosis" element={<ResultDiagnosis />} />

        {/* Prognosis Routes */}
        <Route path="/prognosis" element={<PrognosisSection />} />
        <Route path="/upload/prognosis" element={<UploadPrognosis />} />
        <Route path="/upload/prognosis/multi" element={<UploadPrognosisMulti />} />
        <Route path="/result/prognosis" element={<ResultPrognosis />} />

        {/* Treatment Routes */}
        <Route path="/treatment" element={<TreatmentSection />} />
        <Route path="/upload/treatment" element={<UploadTreatment />} />
        <Route path="/upload/treatment/multi" element={<UploadTreatmentMulti />} />
        <Route path="/result/treatment" element={<ResultTreatment />} />
      </Routes>
    </Router>
  );
}

export default App;
