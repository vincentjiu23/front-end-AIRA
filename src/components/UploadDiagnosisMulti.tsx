import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRef, useState } from "react";

const UploadDiagnosisMulti = () => {
  const navigate = useNavigate();

  // State untuk masing-masing file
  const [selectedGenomeFile, setSelectedGenomeFile] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  // Ref untuk input file
  const genomeInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleGenomeClick = () => {
    genomeInputRef.current?.click();
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-col items-center px-6 py-10 gap-6 flex-1">
        <h2 className="text-2xl font-bold text-blue-900">Upload Dataset</h2>
        <p className="text-gray-600">Upload Multi datasets here</p>

        {/* Hidden input Genome */}
        <input
          type="file"
          ref={genomeInputRef}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setSelectedGenomeFile(file);
          }}
          className="hidden"
        />

        {/* Genome Dataset Upload */}
        <div className="w-full max-w-xl">
          <label className="block font-semibold mb-2">Genome Dataset</label>
          <div
            onClick={handleGenomeClick}
            className="h-48 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 text-center cursor-pointer hover:border-blue-500 transition px-4"
          >
            {selectedGenomeFile ? (
              <span className="text-gray-700 font-medium truncate">
                {selectedGenomeFile.name}
              </span>
            ) : (
              "Click to browse or drag and drop your genome files"
            )}
          </div>
        </div>

        {/* Hidden input Image */}
        <input
          type="file"
          ref={imageInputRef}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setSelectedImageFile(file);
          }}
          className="hidden"
        />

        {/* Image Dataset Upload */}
        <div className="w-full max-w-xl">
          <label className="block font-semibold mb-2">Image Dataset</label>
          <div
            onClick={handleImageClick}
            className="h-48 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 text-center cursor-pointer hover:border-blue-500 transition px-4"
          >
            {selectedImageFile ? (
              <span className="text-gray-700 font-medium truncate">
                {selectedImageFile.name}
              </span>
            ) : (
              "Click to browse or drag and drop your image files"
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/diagnosis")}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            onClick={() => navigate("/result/diagnosis")}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadDiagnosisMulti;
