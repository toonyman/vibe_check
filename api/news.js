// Vercel 서버리스 함수 - API 키는 환경변수로 안전하게 관리됩니다
export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET 요청만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keyword, language = 'en' } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword parameter is required' });
  }

  // 환경변수에서 API 키 가져오기
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // News API 호출
    const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&language=${language === 'ko' ? 'ko' : 'en'}&sortBy=publishedAt&pageSize=50&apiKey=${apiKey}`;

    console.log('Fetching news for keyword:', keyword);

    const response = await fetch(newsApiUrl);
    const data = await response.json();

    // News API 에러 처리
    if (!response.ok || data.status === 'error') {
      const errorMessage = data.message || 'Failed to fetch news';
      const errorCode = data.code || 'unknown';

      console.error('News API Error:', {
        status: response.status,
        code: errorCode,
        message: errorMessage,
        keyword: keyword
      });

      return res.status(response.status || 500).json({
        error: errorMessage,
        errorCode: errorCode,
        success: false,
        details: `News API returned error: ${errorCode} - ${errorMessage}`
      });
    }

    // 성공 응답
    console.log(`Successfully fetched ${data.articles?.length || 0} articles for "${keyword}"`);

    return res.status(200).json({
      success: true,
      articles: data.articles || [],
      totalResults: data.totalResults || 0
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to fetch news data',
      success: false,
      details: `Server error: ${error.message}`
    });
  }
}
