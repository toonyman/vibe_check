import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, RefreshCw, BarChart3, Sun, Moon, Calendar, Share2, Facebook, Twitter, Linkedin, Link, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function VibeCheckApp() {
  const [keyword, setKeyword] = useState('Bitcoin');
  const [loading, setLoading] = useState(false);
  const [vibeData, setVibeData] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');
  const [displayKeywords, setDisplayKeywords] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [trendPeriod, setTrendPeriod] = useState('7d');
  const [copied, setCopied] = useState(false);

  const translations = {
    en: {
      title: 'Vibe-Check',
      subtitle: 'Global Sentiment Tracker',
      vibeTrend: 'Vibe Trend',
      period7d: '7 Days',
      period30d: '30 Days',
      vibeScore: 'Vibe Score',
      placeholder: 'Enter keyword (e.g., Bitcoin, Tesla, K-Pop)',
      analyze: 'Analyze',
      analyzing: 'Analyzing...',
      breakdown: 'Breakdown',
      positive: 'Positive',
      neutral: 'Neutral',
      negative: 'Negative',
      recentHeadlines: 'Recent Headlines',
      adSpace: '💡 Advertisement Space - Monetization Ready',
      adHint: 'Perfect for crypto exchanges, trading platforms, or market analysis tools',
      outOf100: 'out of 100',
      basedOn: 'Based on',
      recentArticles: 'recent articles',
      veryPositive: 'Very Positive',
      veryNegative: 'Very Negative',
      failedFetch: 'Failed to fetch news data',
      apiKeyInvalid: 'API key is invalid. Please check environment variables in Vercel.',
      rateLimited: 'Rate limit exceeded. Please try again later.',
      apiKeyMissing: 'API key not configured. Please set NEWS_API_KEY in Vercel.',
      share: 'Share',
      copyUrl: 'Copy Link',
      copied: 'Copied!',
    },
    ko: {
      title: '바이브-체크',
      subtitle: '전 세계 뉴스 감성 분석기',
      vibeTrend: '감성 추이',
      period7d: '7일',
      period30d: '30일',
      vibeScore: '바이브 점수',
      placeholder: '키워드 입력 (예: 비트코인, 테슬라, 삼성전자)',
      analyze: '분석하기',
      analyzing: '분석 중...',
      breakdown: '감성 분포',
      positive: '긍정적',
      neutral: '중립적',
      negative: '부정적',
      recentHeadlines: '최근 주요 뉴스',
      adSpace: '💡 광고 영역 - 수익화 준비 완료',
      adHint: '암호화폐 거래소나 시장 분석 도구 광고에 적합합니다',
      outOf100: '/ 100점',
      basedOn: '최근',
      recentArticles: '개의 기사 분석 결과',
      veryPositive: '매우 긍정적',
      veryNegative: '매우 부정적',
      failedFetch: '뉴스 데이터를 가져오지 못했습니다',
      apiKeyInvalid: 'API 키가 유효하지 않습니다. Vercel 환경 변수를 확인해주세요.',
      rateLimited: '요청 한도를 초과했습니다. 나중에 다시 시도해주세요.',
      apiKeyMissing: 'API 키가 설정되지 않았습니다. NEWS_API_KEY를 설정해주세요.',
      share: '공유하기',
      copyUrl: '링크 복사',
      copied: '복사됨!',
    },
    jp: {
      title: 'バイブ・チェック',
      subtitle: 'グローバル感情トラッカー',
      vibeTrend: '感情の推移',
      period7d: '7日間',
      period30d: '30日間',
      vibeScore: 'バイブスコア',
      placeholder: 'キーワード入力 (例: ビットコイン, テスラ, K-POP)',
      analyze: '分析する',
      analyzing: '分析中...',
      breakdown: '感情分析の内訳',
      positive: 'ポジティブ',
      neutral: '中立',
      negative: 'ネガティブ',
      recentHeadlines: '最新の見出し',
      adSpace: '💡 広告スペース - 収益化準備完了',
      adHint: '仮想通貨取引所や市場分析ツールに最適です',
      outOf100: '/ 100点',
      basedOn: '最新',
      recentArticles: '件の記事に基づく',
      veryPositive: '非常にポジティブ',
      veryNegative: '非常にネガティブ',
      failedFetch: 'ニュースデータの取得に失敗しました',
      apiKeyInvalid: 'APIキーが無効です。',
      rateLimited: 'レート制限を超えました。',
      apiKeyMissing: 'APIキーが設定されていません。',
      share: '共有する',
      copyUrl: 'リンクをコピー',
      copied: 'コピーされました！',
    },
    es: {
      title: 'Vibe-Check',
      subtitle: 'Rastreador de Sentimiento Global',
      vibeTrend: 'Tendencia de Vibe',
      period7d: '7 Días',
      period30d: '30 Días',
      vibeScore: 'Puntuación Vibe',
      placeholder: 'Palabra clave (ej., Bitcoin, Tesla, K-Pop)',
      analyze: 'Analizar',
      analyzing: 'Analizando...',
      breakdown: 'Desglose',
      positive: 'Positivo',
      neutral: 'Neutral',
      negative: 'Negativo',
      recentHeadlines: 'Titulares Recientes',
      adSpace: '💡 Espacio Publicitario - Listo para Monetizar',
      adHint: 'Ideal para exchanges de cripto o herramientas de análisis',
      outOf100: 'de 100',
      basedOn: 'Basado en',
      recentArticles: 'artículos recientes',
      veryPositive: 'Muy Positivo',
      veryNegative: 'Muy Negativo',
      failedFetch: 'Fallo al obtener noticias',
      apiKeyInvalid: 'Clave API no válida.',
      rateLimited: 'Límite de velocidad excedido.',
      apiKeyMissing: 'Falta la clave API.',
      share: 'Compartir',
      copyUrl: 'Copiar enlace',
      copied: '¡Copiado!',
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

  const shareTo = (platform) => {
    const url = 'https://vibe-check-self.vercel.app/';
    const text = `Check out the current vibe for "${vibeData?.keyword || keyword}"!`;
    const shareUrls = {
      meta: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = () => {
    const url = 'https://vibe-check-self.vercel.app/';
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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

    // Trend Data Calculation
    const trendMap = {};
    analyzedArticles.forEach(article => {
      if (!article.publishedAt) return;
      const date = article.publishedAt.split('T')[0];
      if (!trendMap[date]) trendMap[date] = { date, pos: 0, neg: 0, count: 0 };

      if (article.sentiment === 'positive') trendMap[date].pos++;
      else if (article.sentiment === 'negative') trendMap[date].neg++;
      trendMap[date].count++;
    });

    const trendData = Object.values(trendMap)
      .map(d => ({
        date: d.date,
        score: Math.round(((d.pos - d.neg) / d.count) * 50 + 50)
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

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
      trendData,
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

    // Initialize Google AdSense ads
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense initialization error:', e);
    }
  }, [language]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 md:p-8 ${isDarkMode
      ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'
      : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'
      }`}>
      <div className="max-w-6xl mx-auto">
        {/* Language & Theme Toggle */}
        <div className="flex justify-end gap-3 mb-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full border transition-all ${isDarkMode
              ? 'bg-slate-800/50 border-slate-700/50 text-yellow-400 hover:bg-slate-700/50'
              : 'bg-white border-slate-200 text-purple-600 shadow-sm hover:bg-slate-50'
              }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className={`backdrop-blur-md rounded-full p-1 border transition-all ${isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'
            }`}>
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
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{t.subtitle}</p>
        </header>

        {/* Search Bar */}
        <main>
          <section className={`backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-2xl transition-all ${isDarkMode ? 'bg-slate-800/50' : 'bg-white border border-slate-100'
            }`} aria-label="Search and analyze sentiment">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'
                  }`} />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && analyzeVibe(keyword)}
                  placeholder={t.placeholder}
                  className={`w-full pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${isDarkMode
                    ? 'bg-slate-700/50 text-white placeholder-gray-400'
                    : 'bg-slate-50 text-slate-900 border border-slate-200 placeholder-slate-400'
                    }`}
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
                  className={`px-3 py-1 rounded-full text-sm transition-all ${isDarkMode
                    ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
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
              <div className={`md:col-span-2 backdrop-blur-lg rounded-2xl p-8 shadow-2xl transition-all ${isDarkMode ? 'bg-slate-800/50' : 'bg-white border border-slate-100'
                }`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">"{vibeData.keyword}" {t.vibeScore}</h2>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-slate-500'} text-sm`}>{vibeData.timestamp}</p>
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
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{t.outOf100}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={`h-4 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <div
                    className={`h-full transition-all duration-1000 ${vibeData.vibeScore >= 65 ? 'bg-green-500' :
                      vibeData.vibeScore >= 45 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    style={{ width: `${vibeData.vibeScore}%` }}
                  />
                </div>

                <div className={`text-center text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  {t.basedOn} {vibeData.total}{t.recentArticles}
                </div>

                {/* Share Section */}
                <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-slate-700/50' : 'border-slate-100'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                  <div className="flex items-center gap-2 text-sm font-semibold opacity-80">
                    <Share2 className="w-4 h-4" />
                    {t.share}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => shareTo('meta')}
                      className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-slate-700/50 hover:bg-blue-600/20 text-blue-400' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'}`}
                      title="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => shareTo('x')}
                      className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-slate-700/50 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
                      title="X (Twitter)"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => shareTo('reddit')}
                      className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-slate-700/50 hover:bg-orange-600/20 text-orange-500' : 'bg-orange-50 hover:bg-orange-100 text-orange-600'}`}
                      title="Reddit"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.752c1.824.07 3.48.632 4.674 1.488.308-.362.727-.552 1.205-.552.922 0 1.673.75 1.673 1.673 0 .54-.257 1.05-.724 1.343.02.164.032.333.032.502 0 2.22-2.73 4.02-6.07 4.02-3.34 0-6.07-1.8-6.07-4.02 0-.16.012-.317.032-.472a1.66 1.66 0 0 1-.749-1.373c0-.922.75-1.673 1.673-1.673.456 0 .86.177 1.163.483 1.189-.838 2.812-1.39 4.604-1.472l.745-3.513 3.02.636a1.22 1.22 0 0 1 .253.791zm-7.618 7.373c-.703 0-1.274.571-1.274 1.274 0 .702.571 1.273 1.274 1.273.702 0 1.273-.571 1.273-1.273s-.571-1.274-1.273-1.274zm6.052 2.547a4.93 4.93 0 0 1-3.414 1.135 4.93 4.93 0 0 1-3.414-1.135.253.253 0 0 1 .351-.35c.983.82 2.12 1.228 3.063 1.228.943 0 2.08-.408 3.063-1.229a.253.253 0 0 1 .351.351zm-.51-1.273a1.274 1.274 0 0 1 1.273-1.274 1.274 1.274 0 1 1 0 2.548 1.274 1.274 0 0 1-1.273-1.274z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => shareTo('linkedin')}
                      className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-slate-700/50 hover:bg-blue-500/20 text-blue-500' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'}`}
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <div className="w-[1px] h-4 bg-slate-700 mx-2 hidden sm:block" />
                    <button
                      onClick={copyToClipboard}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${copied
                        ? 'bg-green-500 text-white'
                        : (isDarkMode ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700')
                        }`}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                      <span className="text-xs font-bold uppercase">{copied ? t.copied : t.copyUrl}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sentiment Breakdown */}
              <div className={`backdrop-blur-lg rounded-2xl p-6 shadow-2xl transition-all ${isDarkMode ? 'bg-slate-800/50' : 'bg-white border border-slate-100'
                }`}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {t.breakdown}
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-green-500">{t.positive}</span>
                      <span className="font-semibold">{vibeData.positivePercent}%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${vibeData.positivePercent}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-yellow-500">{t.neutral}</span>
                      <span className="font-semibold">{vibeData.neutralPercent}%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${vibeData.neutralPercent}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-red-500">{t.negative}</span>
                      <span className="font-semibold">{vibeData.negativePercent}%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${vibeData.negativePercent}%` }} />
                    </div>
                  </div>
                </div>

                <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-500">{vibeData.positive}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{t.positive}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">{vibeData.neutral}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{t.neutral}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-500">{vibeData.negative}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{t.negative}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Vibe Trend Chart */}
          {vibeData && vibeData.trendData.length > 0 && (
            <section className={`backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-2xl transition-all ${isDarkMode ? 'bg-slate-800/50' : 'bg-white border border-slate-100'
              }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {t.vibeTrend}
                </h3>
                <div className={`flex p-1 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
                  <button
                    onClick={() => setTrendPeriod('7d')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${trendPeriod === '7d'
                      ? (isDarkMode ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 shadow-sm')
                      : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                      }`}
                  >
                    {t.period7d}
                  </button>
                  <button
                    onClick={() => setTrendPeriod('30d')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${trendPeriod === '30d'
                      ? (isDarkMode ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 shadow-sm')
                      : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                      }`}
                  >
                    {t.period30d}
                  </button>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendPeriod === '7d' ? vibeData.trendData.slice(-7) : vibeData.trendData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} vertical={false} />
                    <XAxis
                      dataKey="date"
                      stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                      fontSize={10}
                      tickFormatter={(str) => {
                        const date = new Date(str);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis
                      stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                      fontSize={10}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                        borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                        color: isDarkMode ? '#f8fafc' : '#0f172a',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorScore)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* Recent Articles */}
          {vibeData && vibeData.articles.length > 0 && (
            <article className={`backdrop-blur-lg rounded-2xl p-6 shadow-2xl transition-all ${isDarkMode ? 'bg-slate-800/50' : 'bg-white border border-slate-100'
              }`}>
              <h3 className="text-xl font-semibold mb-4">{t.recentHeadlines}</h3>
              <div className="space-y-3">
                {vibeData.articles.map((article, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg transition-all cursor-pointer ${isDarkMode ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    onClick={() => article.url && window.open(article.url, '_blank')}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 ${article.sentiment === 'positive' ? 'text-green-500' :
                        article.sentiment === 'negative' ? 'text-red-500' : 'text-yellow-500'
                        }`}>
                        {article.sentiment === 'positive' ? <TrendingUp className="w-5 h-5" /> :
                          article.sentiment === 'negative' ? <TrendingDown className="w-5 h-5" /> :
                            <Minus className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-1 line-clamp-2">{article.title}</h4>
                        {article.description && (
                          <p className={`text-sm mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{article.description}</p>
                        )}
                        <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
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

          {/* Footer Ad Space */}
          <footer className="mt-8">
            <div className="bg-slate-800/30 rounded-lg p-4 text-center min-h-[100px] flex items-center justify-center border border-slate-700/50">
              <ins className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client="ca-pub-7644009675634803"
                data-ad-slot="auto"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            </div>
            <p className="text-[10px] text-gray-600 text-center mt-2 uppercase tracking-widest">Advertisement</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
