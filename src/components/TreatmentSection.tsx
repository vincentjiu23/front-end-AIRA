import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const cancerTypes = [
  "Bladder Cancer",
  "Brain Cancer",
  "Breast Cancer",
  "Breast Cancer (HER2 & TNBC)",
  "Cancer",
  "Cervical Cancer (Cervical Squamous Cell Carcinoma)",
  "Colon Cancer",
  "Gastric Cancer (Adenocarcinoma)",
  "Kidney Cancer (clear cell Renal Cell Carcinoma / ccRCC)",
  "Kidney Cancer (Kidney clear cell carcinoma)",
  "Kidney Cancer (Papillary Cell Carcinoma)",
  "Liver Cancer (Hepatocellular Carcinoma)",
  "Lung Adenocarcinoma (LUAD)",
  "Stomach Adenocarcinoma Cancer",
];

const datasetTypes = [
  "Gene 37",
  "Methyl 100",
  "Gene + Image",
  "Image",
  "Mirna",
];

const DiagnosisSection: React.FC = () => {
  const [selectedCancer, setSelectedCancer] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedDataset === 'Gene + Image') {
      navigate('/upload/diagnosis/multi');
    } else {
      navigate('/upload/diagnosis');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Section dengan background #191757 */}
      <main
        className="relative flex flex-1 h-[600px] overflow-hidden"
        style={{
          backgroundImage: `url('/public/picture5.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
        }}
      >

        <div className="w-1/2"></div>
        {/* Right side with blue background and form */}
        <div
          className="w-1/2 flex items-center justify-center"
          style={{ backgroundColor: '#4e5296' }}
        >
          <div className="flex flex-col gap-6 bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-6">
            <h2
              className="text-2xl font-bold text-center"
              style={{ color: '#191757' }}
            >
                Treatment
            </h2>

            <div>
              <label
                htmlFor="cancer-select"
                className="font-semibold block mb-2"
                style={{ color: '#191757' }}
              >
                Select Cancer Type
              </label>
              <select
                id="cancer-select"
                value={selectedCancer}
                onChange={(e) => setSelectedCancer(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#191757]"
              >
                {cancerTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="dataset-select"
                className="font-semibold block mb-2"
                style={{ color: '#191757' }}
              >
                Select Dataset Type
              </label>
              <select
                id="dataset-select"
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#191757]"
              >
                {datasetTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleContinue}
              className="w-full px-4 py-2 text-white font-semibold rounded transition"
              style={{ backgroundColor: '#191757' }}
            >
              Continue
            </button>
          </div>
        </div>
      </main>




      {/* Kotak biru di atas footer */}
      <div style={{ backgroundColor: '#aaaaaaff' }} className="text-white text-center py-6">
        <p className="text-lg font-semibold">Empowering early cancer detection with AI technology</p>
      </div>

      {/* Footer */}
     <Footer />
    </div>
  );
};

export default DiagnosisSection;
