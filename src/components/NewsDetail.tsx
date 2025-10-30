import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';

interface NewsDetail {
  id: number;
  title: string;
  image_url: string;
  category: string;
  body: string;
  created_at: string;
  created_by: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [error, setError] = useState('');
  const baseUrl = import.meta.env.VITE_AI_BACKEND_URL;

  useEffect(() => {
    if (!id) return;

    fetch(`${baseUrl}/news/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil detail berita");
        return res.json();
      })
      .then((data) => setNews(data))
      .catch((err) => setError(err.message));
  }, [id, baseUrl]);

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="text-red-600 text-center mb-6">{error}</div>
          )}

          {news ? (
            <div className="space-y-6">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-64 object-cover rounded-lg shadow"
              />
              <span className="inline-block px-3 py-1 text-sm rounded bg-[#e0e8ff] text-[#191757]">
                {news.category}
              </span>
              <h1 className="text-3xl font-bold text-[#191757]">{news.title}</h1>
              <p className="text-sm text-gray-600">
                {news.created_by} • {new Date(news.created_at).toLocaleDateString('id-ID')}
              </p>
              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {news.body}
              </div>
              <button
                onClick={() => navigate(-1)}
                className="mt-6 px-4 py-2 bg-gray-200 text-[#191757] rounded hover:bg-gray-300 transition"
              >
                Back
              </button>
            </div>
          ) : (
            !error && <div className="text-center text-gray-500">Load all news...</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
