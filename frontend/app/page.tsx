"use client";

import { useEffect, useState } from "react";

interface Quote {
  text: string;
  author: string;
}

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/quotes");
      const data = await res.json();
      setQuotes(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchAndSetQuotes = async () => {
      await fetchQuotes();
    };
    fetchAndSetQuotes();
    const interval = setInterval(fetchQuotes, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          📊 Quotes Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Live scraped quotes (auto-updating every 10s)
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            Loading quotes...
          </div>
        ) : (
          <div className="grid gap-6">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
              >
                <p className="text-gray-700 text-lg leading-relaxed">
                  “{quote.text}”
                </p>
                <p className="text-gray-500 mt-3 text-right font-medium">
                  — {quote.author}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center mt-12 text-sm text-gray-400">
        Built with Go + Next.js 🚀
      </div>
    </main>
  );
}