# 📚 온라인 서점 프로젝트

## 🎯 프로젝트 소개

당신은 온라인 서점을 위한 웹 애플리케이션을 개발하고 있습니다. 이 애플리케이션은 상품 주인이 책을 검색하고, 상세 정보를 보고 편집하며, 각 책의 판매 수량을 확인할 수 있어야 합니다.

## 배포 URL
https://book-store-psi-six.vercel.app/

## ⚙️ 기술 스택

### Frontend

- **Framework**: Next.js
- **Language**: TypeScript
- **상태 관리**: React Query
- **UI Library**: NextUI
- **Form 관리**: React Hook Form

### Backend

- **Database**: Firebase (Firestore)
- **Storage**: Firebase Storage
- **API**: RESTful API

## 📋 주요 기능

### 1. 도서 목록 페이지

- 페이지네이션 (페이지당 10개 항목)
- 검색 기능
    - 제목 검색
    - 저자 검색
- 도서 정보 표시
    - 번호 (내림차순)
    - 제목 (상세페이지 링크)
    - 저자
    - 가격
    - 재고 수량

### 2. 도서 상세 페이지

- 도서 상세 정보 표시
    - 제목
    - 저자
    - 도서 이미지
    - 가격
    - 재고 수량
    - 설명
    - 등록일
- 수정 및 뒤로가기, 삭제 기능

### 3. 도서 등록 페이지

- 도서 정보 입력 폼
    - 제목 (필수)
    - 저자 (필수)
    - 설명
    - 도서 이미지 업로드
    - 가격 (필수)
    - 재고 수량 (기본값: 100)
- 유효성 검사
- 이미지 업로드 기능

### 4. 도서 수정 페이지

- 기존 정보 표시
- 전체 필드 수정 가능
- 이미지 수정 기능
    - 새 이미지 업로드 시 기존 이미지 대체
    - 미변경 시 기존 이미지 유지

## 📌 API 엔드포인트

```
Copy
GET /api/books - 도서 목록 조회
GET /api/books/:id - 특정 도서 조회
POST /api/books - 도서 추가
PUT /api/books/:id - 도서 정보 수정
DELETE /api/books/:id - 도서 삭제

```

## 📚 Firebase Database 구조

### 📑 Collection: books

#### Document Structure

각 도서는 고유한 ID를 가진 document로 저장됩니다.

```tsx
{
  author: string;           // 저자명
  bookImage: string;        // 도서 이미지 URL (Firebase Storage)
  createdAt: timestamp;     // 생성 일시
  description: string;      // 도서 설명
  price: number;           // 가격
  stock: number;           // 재고 수량
  title: string;           // 도서 제목
  updatedAt: timestamp | null;  // 수정 일시
}

```

#### 필드 상세

- **author**: 도서의 저자
- **bookImage**: Firebase Storage에 저장된 도서 이미지의 URL
- **createdAt**: 도서 정보 최초 등록 일시
- **description**: 도서에 대한 상세 설명
- **price**: 도서 가격 (숫자형)
- **stock**: 재고 수량 (숫자형)
- **title**: 도서 제목
- **updatedAt**: 도서 정보 수정 일시 (수정되지 않은 경우 null)

#### 예시 데이터

```json
{
  "FFHBT4r6vBbeVUx8LbKv": {
    "author": "test",
    "bookImage": "<https://firebasestorage.googleapis.com/>...",
    "createdAt": "2024-12-14T08:33:58.461Z",
    "description": "",
    "price": 6,
    "stock": 100,
    "title": "test44",
    "updatedAt": null
  }
}

```

## 🔍 개선 및 최적화

- TypeScript를 사용한 타입 안전성 확보
- 성능 최적화 (캐싱, 지연 로딩)
- 에러 처리 및 예외 상황 관리
- UI/UX 개선
- Git-flow를 활용한 버전 관리

## 🚀 배포

- 프로젝트는 Heroku 또는 Netlify를 통해 배포 가능
- README.md 파일에 설정 및 실행 방법 문서화
- 실행되는 전체 프로세스에 대한 녹화본 제공

## 💻 로컬 개발 환경 설정

```bash
bash
Copy
# 프로젝트 클론
git clone [repository-url]

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

```

## 📝 기술적 요구사항 충족
- TypeScript를 활용한 프론트엔드와 백엔드 간 타입 안전성 확보
- 기본적인 테스트 작성
- 코드 구조, 아키텍처 및 품질 관리
- Git 사용법(Git-flow) 준수

## 프로젝트 구조
```html
📦src
 ┣ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂books
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂books
 ┃ ┃ ┣ 📂create
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜error.tsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📂clients
 ┃ ┃ ┣ 📂books
 ┃ ┃ ┃ ┗ 📜BooksClient.tsx
 ┃ ┃ ┣ 📂create
 ┃ ┃ ┃ ┗ 📜CreateClient.tsx
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┗ 📜DetailClient.tsx
 ┃ ┃ ┗ 📂edit
 ┃ ┃ ┃ ┗ 📜EditClient.tsx
 ┃ ┣ 📂header
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┣ 📂heading
 ┃ ┃ ┗ 📜Heading.tsx
 ┃ ┣ 📂inputs
 ┃ ┃ ┣ 📂labelImageUpload
 ┃ ┃ ┃ ┗ 📜LabelImageUpload.tsx
 ┃ ┃ ┣ 📂labelInput
 ┃ ┃ ┃ ┗ 📜LabelInput.tsx
 ┃ ┃ ┣ 📂labelSelect
 ┃ ┃ ┃ ┗ 📜LabelSelect.tsx
 ┃ ┃ ┗ 📜LabelLayout.tsx
 ┃ ┣ 📂labelText
 ┃ ┃ ┗ 📜LabelText.tsx
 ┃ ┣ 📂loader
 ┃ ┃ ┗ 📜Loader.tsx
 ┃ ┣ 📂pagination
 ┃ ┃ ┗ 📜Pagination.tsx
 ┃ ┣ 📂providers
 ┃ ┃ ┗ 📜Providers.tsx
 ┃ ┗ 📂tooltip
 ┃ ┃ ┗ 📜ErrorTooltip.tsx
 ┣ 📂lib
 ┃ ┣ 📜api.ts
 ┃ ┗ 📜firebase.ts
 ┣ 📂type
 ┃ ┗ 📜index.ts
 ┗ 📂utils
 ┃ ┗ 📜http.ts
 ```

## 개발 기간
- 전체 개발 기간 : 2024-12-13 ~ 2024-12-15