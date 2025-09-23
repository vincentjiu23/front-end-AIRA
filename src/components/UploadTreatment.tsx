import Navbar from './Navbar';
import Footer from './Footer';

const UploadTreatment = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col items-center px-6 py-10 gap-6 flex-1">
        {/* Judul biru tua */}
        <h2 className="text-2xl font-bold text-blue-900">Upload Dataset</h2>

        {/* Box upload file */}
        <label className="w-full max-w-xl h-48 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 text-center cursor-pointer hover:border-blue-500 transition">
          <input type="file" className="hidden" />
          Click to browse or drag and drop your files
        </label>

        {/* Tombol */}
        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition">
            Back
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
            Continue
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadTreatment;
