# 🎭 Vibe-Check - Global Sentiment Tracker

실시간 뉴스 감성 분석을 통해 특정 키워드에 대한 전 세계적인 분위기를 'Vibe Score'로 시각화하는 대시보드입니다.

## ✨ 주요 기능

- 🔍 **키워드 기반 감성 분석** - Bitcoin, Tesla, K-Pop 등 어떤 키워드든 분석 가능
- 📊 **Vibe Score (0-100)** - 직관적인 점수 시스템으로 현재 분위기 파악
- 📈 **실시간 데이터** - News API를 통한 최신 뉴스 분석
- 🎨 **아름다운 UI** - 현대적이고 반응형 디자인
- 🔒 **안전한 API 관리** - Vercel 서버리스 함수로 API 키 보호

## 🚀 빠른 시작

### 1. 프로젝트 클론

```bash
git clone <your-repo-url>
cd vibe-check
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 API 키 입력:

```bash
cp .env.example .env
```

`.env` 파일 내용:
```
NEWS_API_KEY=59288adbc1004924ac7b0bb6661d5fcb
```

### 4. 로컬 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

## 📦 Vercel 배포 가이드

### 방법 1: Vercel CLI 사용 (추천)

1. **Vercel CLI 설치**
```bash
npm install -g vercel
```

2. **로그인**
```bash
vercel login
```

3. **배포**
```bash
vercel
```

첫 배포시 몇 가지 질문에 답하세요:
- Set up and deploy? → Yes
- Which scope? → 본인 계정 선택
- Link to existing project? → No
- Project name? → vibe-check (또는 원하는 이름)
- In which directory is your code located? → ./
- Want to override settings? → No

4. **환경 변수 설정**
```bash
vercel env add NEWS_API_KEY
```
값 입력: `59288adbc1004924ac7b0bb6661d5fcb`
환경 선택: Production, Preview, Development 모두 선택

5. **프로덕션 배포**
```bash
vercel --prod
```

### 방법 2: Vercel 웹 대시보드 사용

1. **GitHub 리포지토리 생성**
   - GitHub에 새 리포지토리 생성
   - 코드 푸시:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Vercel에 배포**
   - [vercel.com](https://vercel.com) 접속 및 로그인
   - "Add New Project" 클릭
   - GitHub 리포지토리 import
   - 프로젝트 설정:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **환경 변수 설정**
   - Project Settings → Environment Variables
   - 추가: 
     - Name: `NEWS_API_KEY`
     - Value: `59288adbc1004924ac7b0bb6661d5fcb`
     - Environment: Production, Preview, Development

4. **배포**
   - "Deploy" 클릭
   - 몇 분 후 배포 완료!

## 🔧 프로젝트 구조

```
vibe-check/
├── api/
│   └── news.js              # Vercel 서버리스 함수
├── src/
│   ├── App.jsx              # 메인 애플리케이션
│   ├── main.jsx             # React 엔트리 포인트
│   └── index.css            # Tailwind CSS
├── index.html               # HTML 템플릿
├── package.json             # 의존성
├── vite.config.js           # Vite 설정
├── tailwind.config.js       # Tailwind 설정
├── vercel.json              # Vercel 설정
└── .env.example             # 환경 변수 예시
```

## 🛠 기술 스택

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Vercel Serverless Functions
- **API**: News API
- **Deployment**: Vercel

## 🔐 보안

- ✅ API 키는 서버사이드에서만 사용
- ✅ 클라이언트에 노출되지 않음
- ✅ 환경 변수로 안전하게 관리
- ✅ `.env` 파일은 `.gitignore`에 포함

## 💰 수익화 전략

1. **광고 삽입**
   - Footer 영역에 Google AdSense 연동
   - 사이드바 배너 광고

2. **프리미엄 기능**
   - 무료: 하루 10회 검색 제한
   - 프리미엄: 무제한 검색, 히스토리 저장, API 접근

3. **B2B 솔루션**
   - 기업용 대시보드 제공
   - 브랜드 모니터링 서비스
   - 화이트라벨 솔루션

## 📊 News API 사용량

- **무료 플랜**: 
  - 하루 100 요청
  - 최근 1개월 뉴스만 조회 가능
  - 개발/테스트용으로 충분

- **유료 플랜**: 
  - 무제한 요청
  - 전체 아카이브 접근
  - 상업적 사용 가능

## 🚀 다음 단계

- [ ] 더 정교한 감성 분석 (ML 모델 통합)
- [ ] 소셜 미디어 데이터 통합 (Twitter API)
- [ ] 히스토리 차트 (트렌드 시각화)
- [ ] 사용자 계정 시스템
- [ ] 알림 기능 (특정 키워드 모니터링)
- [ ] 다국어 지원

## 📝 라이선스

MIT License

## 🤝 기여

Pull Request를 환영합니다!

## 📧 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ for sentiment analysis enthusiasts**
