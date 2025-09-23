import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { useRef, useState } from 'react';

const UploadDiagnosis = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // simpan ke state
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-col items-center px-6 py-10 gap-6 flex-1">
        <h2 className="text-2xl font-bold text-blue-900">Upload Dataset</h2>

        {/* Hidden input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Box klik */}
        <div
          onClick={handleBoxClick}
          className="w-full max-w-xl h-48 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 text-center cursor-pointer hover:border-blue-500 transition px-4"
        >
          {selectedFile ? (
            <span className="text-gray-700 font-medium truncate">
              {selectedFile.name}
            </span>
          ) : (
            "Click to browse or drag and drop your files"
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate('/diagnosis')}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            onClick={() => navigate('/result/diagnosis')}
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

export default UploadDiagnosis;
