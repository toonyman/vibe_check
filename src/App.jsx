import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, RefreshCw, BarChart3 } from 'lucide-react';

export default function VibeCheckApp() {
  const [keyword, setKeyword] = useState('Bitcoin');
  const [loading, setLoading] = useState(false);
  const [vibeData, setVibeData] = useState(null);
  const [error, setError] = useState(null);

  const presetKeywords = ['Bitcoin', 'Tesla', 'K-Pop', 'AI', 'Climate Change', 'Apple'];

  const analyzeVibe = async (searchTerm) => {
    setLoading(true);
    setError(null);

    try {
      // Vercel 서버리스 함수 호출 (API 키는 서버에 안전하게 보관됨)
      const response = await fetch(`/api/news?keyword=${encodeURIComponent(searchTerm)}`);

      const data = await response.json();

      // API 에러 처리
      if (!response.ok || data.error) {
        const errorMsg = data.details || data.error || 'Failed to fetch news data';
        const errorCode = data.errorCode || '';

        // 에러 코드별 사용자 친화적 메시지
        let userMessage = errorMsg;
        if (errorCode === 'apiKeyInvalid') {
          userMessage = 'API key is invalid. Please check environment variables in Vercel.';
        } else if (errorCode === 'rateLimited') {
          userMessage = 'Rate limit exceeded. Please try again later.';
        } else if (errorCode === 'apiKeyMissing') {
          userMessage = 'API key not configured. Please set NEWS_API_KEY in Vercel.';
        }

        throw new Error(userMessage);
      }

      // 감성 분석
      const analyzed = performSentimentAnalysis(data.articles, searchTerm);
      setVibeData(analyzed);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const performSentimentAnalysis = (articles, term) => {
    const positiveWords = ['breakthrough', 'success', 'growth', 'innovation', 'celebrates', 'milestone', 'positive', 'rises', 'gains', 'soars', 'wins', 'surges', 'profit', 'record', 'best'];
    const negativeWords = ['concerns', 'challenges', 'struggles', 'falls', 'drops', 'crisis', 'fails', 'loss', 'decline', 'hurdles', 'volatility', 'crash', 'worst', 'plunges', 'risks'];

    let positive = 0, negative = 0, neutral = 0;
    const analyzedArticles = [];

    articles.forEach(article => {
      const text = `${article.title} ${article.description || ''}`.toLowerCase();

      const posScore = positiveWords.filter(w => text.includes(w)).length;
      const negScore = negativeWords.filter(w => text.includes(w)).length;

      let sentiment = 'neutral';
      if (posScore > negScore) sentiment = 'positive';
      else if (negScore > posScore) sentiment = 'negative';

      if (sentiment === 'positive') positive++;
      else if (sentiment === 'negative') negative++;
      else neutral++;

      analyzedArticles.push({ ...article, sentiment });
    });

    const total = articles.length;
    const vibeScore = total > 0 ? Math.round(((positive - negative) / total) * 50 + 50) : 50;

    return {
      keyword: term,
      vibeScore,
      total,
      positive,
      negative,
      neutral,
      positivePercent: total > 0 ? Math.round((positive / total) * 100) : 0,
      negativePercent: total > 0 ? Math.round((negative / total) * 100) : 0,
      neutralPercent: total > 0 ? Math.round((neutral / total) * 100) : 0,
      articles: analyzedArticles.slice(0, 10),
      timestamp: new Date().toLocaleString()
    };
  };

  const getVibeColor = (score) => {
    if (score >= 65) return 'text-green-500';
    if (score >= 45) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getVibeIcon = (score) => {
    if (score >= 65) return <TrendingUp className="w-8 h-8" />;
    if (score >= 45) return <Minus className="w-8 h-8" />;
    return <TrendingDown className="w-8 h-8" />;
  };

  const getVibeLabel = (score) => {
    if (score >= 75) return 'Very Positive';
    if (score >= 60) return 'Positive';
    if (score >= 45) return 'Neutral';
    if (score >= 30) return 'Negative';
    return 'Very Negative';
  };

  useEffect(() => {
    analyzeVibe('Bitcoin');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Vibe-Check
          </h1>
          <p className="text-gray-400">Global Sentiment Tracker</p>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && analyzeVibe(keyword)}
                placeholder="Enter keyword (e.g., Bitcoin, Tesla, K-Pop)"
                className="w-full pl-11 pr-4 py-3 bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => analyzeVibe(keyword)}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>

          {/* Preset Keywords */}
          <div className="flex flex-wrap gap-2">
            {presetKeywords.map(k => (
              <button
                key={k}
                onClick={() => {
                  setKeyword(k);
                  analyzeVibe(k);
                }}
                className="px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 rounded-full text-sm transition-all"
              >
                {k}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Vibe Score Display */}
        {vibeData && (
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Main Vibe Score */}
            <div className="md:col-span-2 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">"{vibeData.keyword}" Vibe Score</h2>
                  <p className="text-gray-400 text-sm">{vibeData.timestamp}</p>
                </div>
                <div className={`${getVibeColor(vibeData.vibeScore)}`}>
                  {getVibeIcon(vibeData.vibeScore)}
                </div>
              </div>

              <div className="flex items-end gap-4 mb-6">
                <div className={`text-7xl font-bold ${getVibeColor(vibeData.vibeScore)}`}>
                  {vibeData.vibeScore}
                </div>
                <div className="mb-3">
                  <div className={`text-2xl font-semibold ${getVibeColor(vibeData.vibeScore)}`}>
                    {getVibeLabel(vibeData.vibeScore)}
                  </div>
                  <div className="text-gray-400">out of 100</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${vibeData.vibeScore >= 65 ? 'bg-green-500' :
                      vibeData.vibeScore >= 45 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  style={{ width: `${vibeData.vibeScore}%` }}
                />
              </div>

              <div className="text-center text-sm text-gray-400 mt-2">
                Based on {vibeData.total} recent articles
              </div>
            </div>

            {/* Sentiment Breakdown */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Breakdown
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-green-400">Positive</span>
                    <span className="font-semibold">{vibeData.positivePercent}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${vibeData.positivePercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-yellow-400">Neutral</span>
                    <span className="font-semibold">{vibeData.neutralPercent}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${vibeData.neutralPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-red-400">Negative</span>
                    <span className="font-semibold">{vibeData.negativePercent}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${vibeData.negativePercent}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">{vibeData.positive}</div>
                    <div className="text-xs text-gray-400">Positive</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">{vibeData.neutral}</div>
                    <div className="text-xs text-gray-400">Neutral</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">{vibeData.negative}</div>
                    <div className="text-xs text-gray-400">Negative</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Articles */}
        {vibeData && vibeData.articles.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Recent Headlines</h3>
            <div className="space-y-3">
              {vibeData.articles.map((article, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all cursor-pointer"
                  onClick={() => article.url && window.open(article.url, '_blank')}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 ${article.sentiment === 'positive' ? 'text-green-400' :
                        article.sentiment === 'negative' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                      {article.sentiment === 'positive' ? <TrendingUp className="w-5 h-5" /> :
                        article.sentiment === 'negative' ? <TrendingDown className="w-5 h-5" /> :
                          <Minus className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1 line-clamp-2">{article.title}</h4>
                      {article.description && (
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">{article.description}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="truncate">{article.source?.name || 'Unknown'}</span>
                        <span>•</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Ad Space */}
        <div className="mt-8 p-6 bg-slate-800/30 rounded-lg text-center text-gray-500 text-sm">
          <p>💡 Advertisement Space - Monetization Ready</p>
          <p className="text-xs mt-1">Perfect for crypto exchanges, trading platforms, or market analysis tools</p>
        </div>
      </div>
    </div>
  );
}
