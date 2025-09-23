import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRef, useState } from 'react';

const UploadPrognosisMulti = () => {
  const navigate = useNavigate();

  // State untuk menyimpan file yang dipilih
  const [genomeFile, setGenomeFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const genomeInputRef = useRef(null);
  const imageInputRef = useRef(null);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col items-center px-6 py-10 gap-6 flex-1">
        <h2 className="text-2xl font-bold text-blue-900">Upload Dataset</h2>
        <p className="text-gray-600">Upload Multi datasets here</p>

        {/* Genome Dataset Upload */}
        <div className="w-full max-w-xl">
          <label className="block font-semibold mb-2">Genome Dataset</label>
          {/* Hidden input */}
          <input
            type="file"
            ref={genomeInputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setGenomeFile(file);
            }}
            className="hidden"
          />
          {/* Upload Box */}
          <div
            onClick={() => genomeInputRef.current?.click()}
            className="h-48 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center px-4 text-gray-500 text-center cursor-pointer hover:border-blue-500 transition"
          >
            {genomeFile ? (
              <span className="text-gray-700 font-medium truncate">
                {genomeFile.name}
              </span>
            ) : (
              "Click to browse or drag and drop your genome files"
            )}
          </div>
        </div>

        {/* Image Dataset Upload */}
        <div className="w-full max-w-xl">
          <label className="block font-semibold mb-2">Image Dataset</label>
          {/* Hidden input */}
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setImageFile(file);
            }}
            className="hidden"
          />
          {/* Upload Box */}
          <div
            onClick={() => imageInputRef.current?.click()}
            className="h-48 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center px-4 text-gray-500 text-center cursor-pointer hover:border-blue-500 transition"
          >
            {imageFile ? (
              <span className="text-gray-700 font-medium truncate">
                {imageFile.name}
              </span>
            ) : (
              "Click to browse or drag and drop your image files"
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate('/prognosis')}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            onClick={() => navigate('/result/prognosis')}
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

export default UploadPrognosisMulti;
