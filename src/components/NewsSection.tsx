import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

interface NewsItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
  body: string;
  created_at: string;
  created_by: string;
}

const NewsSection: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'news' | 'tutorial' | 'documentary'>('all');
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_AI_BACKEND_URL;

  useEffect(() => {
    fetch(`${baseUrl}/news`)
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.error("Gagal mengambil data berita:", err));
  }, []);

  const filteredNews = selectedCategory === 'all'
    ? newsList
    : newsList.filter((item) => item.category.toLowerCase() === selectedCategory);

  const handleNavigate = (id: number) => {
    navigate(`/news/${id}`);
  };

  const headline = newsList[0];

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <main className="flex-1 py-10 px-6">
        {/* Headline */}
        {headline && (
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={headline.image_url}
                alt={headline.title}
                className="w-full h-[320px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute bottom-0 left-0 right-0 text-white p-6 z-10">
                <h2 className="text-2xl font-bold mb-2">{headline.title}</h2>
                <button
                  onClick={() => handleNavigate(headline.id)}
                  className="mt-3 px-4 py-2 bg-pink-600 text-white rounded text-sm hover:bg-pink-700 transition"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="max-w-6xl mx-auto flex justify-end mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded text-sm text-[#191757] hover:bg-[#e0e8ff] focus:outline-none focus:ring-2 focus:ring-[#191757]"
          >
            <option value="all">All</option>
            <option value="news">News</option>
            <option value="tutorial">Tutorial</option>
            <option value="documentary">Documenter</option>
          </select>
        </div>

        {/* Berita Grid */}
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => handleNavigate(article.id)}
              className="relative cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-md transition group"
            >
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                <span className="inline-block mb-1 px-2 py-1 text-xs rounded bg-pink-500 text-white">
                  {article.category}
                </span>
                <h3 className="text-md font-semibold leading-snug">{article.title}</h3>
                <p className="text-xs text-gray-200 mt-1">
                  {article.created_by} • {new Date(article.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsSection;
