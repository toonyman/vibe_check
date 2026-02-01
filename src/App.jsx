import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, RefreshCw, BarChart3 } from 'lucide-react';

export default function VibeCheckApp() {
  const [keyword, setKeyword] = useState('Bitcoin');
  const [loading, setLoading] = useState(false);
  const [vibeData, setVibeData] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');
  const [displayKeywords, setDisplayKeywords] = useState([]);

  const translations = {
    en: {
      title: 'Vibe-Check',
      subtitle: 'Global Sentiment Tracker',
      vibeScore: 'Vibe Score',
      placeholder: 'Enter keyword (e.g., Bitcoin, Tesla, K-Pop)',
      analyze: 'Analyze',
      analyzing: 'Analyzing...',
      breakdown: 'Breakdown',
      positive: 'Positive',
      neutral: 'Neutral',
      negative: 'Negative',
      recentHeadlines: 'Recent Headlines',
      outOf100: 'out of 100',
      basedOn: 'Based on',
      recentArticles: 'recent articles',
      veryPositive: 'Very Positive',
      veryNegative: 'Very Negative',
      failedFetch: 'Failed to fetch news data',
      apiKeyInvalid: 'API key is invalid. Please check environment variables in Vercel.',
      rateLimited: 'Rate limit exceeded. Please try again later.',
      apiKeyMissing: 'API key not configured. Please set NEWS_API_KEY in Vercel.',
    },
    ko: {
      title: '바이브-체크',
      subtitle: '전 세계 뉴스 감성 분석기',
      vibeScore: '바이브 점수',
      placeholder: '키워드 입력 (예: 비트코인, 테슬라, 삼성전자)',
      analyze: '분석하기',
      analyzing: '분석 중...',
      breakdown: '감성 분포',
      positive: '긍정적',
      neutral: '중립적',
      negative: '부정적',
      recentHeadlines: '최근 주요 뉴스',
      outOf100: '/ 100점',
      basedOn: '최근',
      recentArticles: '개의 기사 분석 결과',
      veryPositive: '매우 긍정적',
      veryNegative: '매우 부정적',
      failedFetch: '뉴스 데이터를 가져오지 못했습니다',
      apiKeyInvalid: 'API 키가 유효하지 않습니다. Vercel 환경 변수를 확인해주세요.',
      rateLimited: '요청 한도를 초과했습니다. 나중에 다시 시도해주세요.',
      apiKeyMissing: 'API 키가 설정되지 않았습니다. NEWS_API_KEY를 설정해주세요.',
    },
    jp: {
      title: 'バイブ・チェック',
      subtitle: 'グローバル感情トラッカー',
      vibeScore: 'バイブスコア',
      placeholder: 'キーワード入力 (例: ビットコイン, テスラ, K-POP)',
      analyze: '分析する',
      analyzing: '分析中...',
      breakdown: '感情分析の内訳',
      positive: 'ポジティブ',
      neutral: '中立',
      negative: 'ネガティブ',
      recentHeadlines: '最新の見出し',
      outOf100: '/ 100点',
      basedOn: '最新',
      recentArticles: '件の記事に基づく',
      veryPositive: '非常にポジティブ',
      veryNegative: '非常にネガティブ',
      failedFetch: 'ニュースデータの取得に失敗しました',
      apiKeyInvalid: 'APIキーが無効です。',
      rateLimited: 'レート制限を超えました。',
      apiKeyMissing: 'APIキーが設定されていません。',
    },
    es: {
      title: 'Vibe-Check',
      subtitle: 'Rastreador de Sentimiento Global',
      vibeScore: 'Puntuación Vibe',
      placeholder: 'Palabra clave (ej., Bitcoin, Tesla, K-Pop)',
      analyze: 'Analizar',
      analyzing: 'Analizando...',
      breakdown: 'Desglose',
      positive: 'Positivo',
      neutral: 'Neutral',
      negative: 'Negativo',
      recentHeadlines: 'Titulares Recientes',
      outOf100: 'de 100',
      basedOn: 'Basado en',
      recentArticles: 'artículos recientes',
      veryPositive: 'Muy Positivo',
      veryNegative: 'Muy Negativo',
      failedFetch: 'Fallo al obtener noticias',
      apiKeyInvalid: 'Clave API no válida.',
      rateLimited: 'Límite de velocidad excedido.',
      apiKeyMissing: 'Falta la clave API.',
    }
  };

  const t = translations[language];

  const keywordPool = {
    en: [
      'Bitcoin', 'Tesla', 'K-Pop', 'AI', 'Apple', 'NVIDIA', 'Ethereum', 'Amazon', 'Microsoft', 'SpaceX',
      'Climate Change', 'Metaverse', 'ESG', 'ChatGPT', 'Netflix', 'Disney', 'Google', 'NASA', 'Ferrari',
      'Samsung', 'Sony', 'Intel', 'AMD', 'Meta', 'TikTok', 'Instagram', 'Spotify', 'Uber', 'Airbnb', 'Nike'
    ],
    ko: [
      '비트코인', '테슬라', '삼성전자', '인공지능', '애플', '엔비디아', '이더리움', '카카오', '네이버', '현대자동차',
      '기후변화', '메타버스', '챗GPT', '넷플릭스', '디즈니', '구글', '나사', '페라리', '삼성', '소니',
      '인텔', 'AMD', '메타', '틱톡', '인스타그램', '스포티파이', '우버', '에어비앤비', '나이키', '불닭볶음면',
      '에스파', '뉴진스', '손흥민', '오징어게임', '한강', '봉준호', '싸이', '방탄소년단', '리그오브레전드', '페이커'
    ],
    jp: [
      'ビットコイン', 'テスラ', 'トヨタ', '任天堂', 'ソニー', 'ソフトバンク', 'AI', 'Apple', 'NVIDIA', 'イーサリアム',
      '気候変動', 'メタバース', 'ChatGPT', 'Netflix', 'ディズニー', 'Google', 'NASA', 'フェラーリ', '三菱', 'ホンダ',
      'パナソニック', 'キーエンス', 'ユニクロ', 'TikTok', 'Instagram', 'Spotify', 'Uber', 'Airbnb', 'Nike', '大谷翔平',
      'アニメ', '寿司', '東京オリンピック', '呪術廻戦', '鬼滅の刃', '村上春樹', '坂本龍一', '藤井聡太', '推しの子'
    ],
    es: [
      'Bitcoin', 'Tesla', 'Real Madrid', 'Barcelona', 'AI', 'Apple', 'NVIDIA', 'Ethereum', 'Amazon', 'Microsoft',
      'Cambio Climático', 'Metaverso', 'ChatGPT', 'Netflix', 'Disney', 'Google', 'NASA', 'Ferrari', 'Zara', 'Santander',
      'Telefónica', 'Iberdrola', 'Mercadona', 'TikTok', 'Instagram', 'Spotify', 'Uber', 'Airbnb', 'Nike', 'Lionel Messi',
      'Rosalía', 'Shakira', 'Bad Bunny', 'La Casa de Papel', 'Cervantes', 'Almodóvar', 'Dalí', 'Picasso', 'Paella'
    ]
  };

  const getRandomKeywords = (lang, count = 10) => {
    const pool = keywordPool[lang] || keywordPool['en'];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const analyzeVibe = async (searchTerm) => {
    setLoading(true);
    setError(null);

    try {
      // Vercel 서버리스 함수 호출
      const response = await fetch(`/api/news?keyword=${encodeURIComponent(searchTerm)}&language=${language}`);

      const data = await response.json();

      // API 에러 처리
      if (!response.ok || data.error) {
        const errorMsg = data.details || data.error || 'Failed to fetch news data';
        const errorCode = data.errorCode || '';

        // 에러 코드별 사용자 친화적 메시지
        let userMessage = errorMsg;
        if (errorCode === 'apiKeyInvalid') {
          userMessage = t.apiKeyInvalid;
        } else if (errorCode === 'rateLimited') {
          userMessage = t.rateLimited;
        } else if (errorCode === 'apiKeyMissing') {
          userMessage = t.apiKeyMissing;
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
    const positiveWords = {
      en: ['breakthrough', 'success', 'growth', 'innovation', 'celebrates', 'milestone', 'positive', 'rises', 'gains', 'soars', 'wins', 'surges', 'profit', 'record', 'best'],
      ko: ['상승', '급등', '호재', '성공', '성장', '혁신', '최고', '기대', '강세', '돌파', '이익', '기록', '최대', '확대', '유망'],
      jp: ['上昇', '急上昇', '好材', '最高', '成功', '成長', '革新', '期待', '強気', '突破', '利益', '記録', '最大', '拡大', '有望'],
      es: ['avance', 'éxito', 'crecimiento', 'innovación', 'celebra', 'hito', 'positivo', 'sube', 'ganancia', 'dispara', 'gana', 'aumento', 'beneficio', 'récord', 'mejor']
    };
    const negativeWords = {
      en: ['concerns', 'challenges', 'struggles', 'falls', 'drops', 'crisis', 'fails', 'loss', 'decline', 'hurdles', 'volatility', 'crash', 'worst', 'plunges', 'risks'],
      ko: ['하락', '급락', '우려', '실패', '감소', '위기', '손실', '악재', '약세', '부진', '충격', '폭락', '최저', '축소', '위험'],
      jp: ['下落', '急落', '懸念', '失敗', '減少', '危機', '損失', '悪材', '弱気', '不振', '衝撃', '暴落', '最低', '縮小', '危険'],
      es: ['preocupación', 'desafío', 'lucha', 'cae', 'baja', 'crisis', 'falla', 'pérdida', 'caída', 'obstáculo', 'volatilidad', 'choque', 'peor', 'desplome', 'riesgo']
    };

    const posList = positiveWords[language] || positiveWords['en'];
    const negList = negativeWords[language] || negativeWords['en'];

    let positive = 0, negative = 0, neutral = 0;
    const analyzedArticles = [];

    articles.forEach(article => {
      const text = `${article.title} ${article.description || ''}`.toLowerCase();

      const posScore = posList.filter(w => text.includes(w)).length;
      const negScore = negList.filter(w => text.includes(w)).length;

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
    if (score >= 75) return t.veryPositive;
    if (score >= 60) return t.positive;
    if (score >= 45) return t.neutral;
    if (score >= 30) return t.negative;
    return t.veryNegative;
  };

  useEffect(() => {
    analyzeVibe('Bitcoin');
    setDisplayKeywords(getRandomKeywords(language, 10));
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-full p-1 border border-slate-700/50">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ko')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${language === 'ko' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              KO
            </button>
            <button
              onClick={() => setLanguage('jp')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${language === 'jp' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              JP
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${language === 'es' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              ES
            </button>
          </div>
        </div>

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </header>

        {/* Search Bar */}
        <main>
          <section className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-2xl" aria-label="Search and analyze sentiment">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && analyzeVibe(keyword)}
                  placeholder={t.placeholder}
                  className="w-full pl-11 pr-4 py-3 bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>
              <button
                onClick={() => analyzeVibe(keyword)}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                {loading ? t.analyzing : t.analyze}
              </button>
            </div>

            {/* Preset Keywords */}
            <div className="flex flex-wrap gap-2">
              {displayKeywords.map(k => (
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
          </section>

          {/* Vibe Score Display */}
          {vibeData && (
            <section className="grid md:grid-cols-3 gap-6 mb-6" aria-label="Sentiment analysis results">
              {/* Main Vibe Score */}
              <div className="md:col-span-2 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">"{vibeData.keyword}" {t.vibeScore}</h2>
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
                    <div className="text-gray-400">{t.outOf100}</div>
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
                  {t.basedOn} {vibeData.total}{t.recentArticles}
                </div>
              </div>

              {/* Sentiment Breakdown */}
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {t.breakdown}
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-green-400">{t.positive}</span>
                      <span className="font-semibold">{vibeData.positivePercent}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${vibeData.positivePercent}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-yellow-400">{t.neutral}</span>
                      <span className="font-semibold">{vibeData.neutralPercent}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${vibeData.neutralPercent}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-red-400">{t.negative}</span>
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
                      <div className="text-xs text-gray-400">{t.positive}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">{vibeData.neutral}</div>
                      <div className="text-xs text-gray-400">{t.neutral}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-400">{vibeData.negative}</div>
                      <div className="text-xs text-gray-400">{t.negative}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Recent Articles */}
          {vibeData && vibeData.articles.length > 0 && (
            <article className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-semibold mb-4">{t.recentHeadlines}</h3>
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
            </article>
          )}

        </main>
      </div>
    </div>
  );
}
