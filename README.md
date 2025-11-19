# hackathon-frontend

src/
├── App.tsx
├── index.tsx
│
├── components/          // UI部品 (フォーム, ボタン, スピナー)
│   └── auth/
│       └── SignupForm.tsx
│
├── pages/               // ルーティングの先
│   ├── LoginPage.tsx
│   └── SignupPage.tsx
│
├── lib/                 // 設定や外部連携 (APIキー, インスタンス初期化)
│   └── firebaseConfig.ts
│
└── hooks/               // 新規作成ロジック
    └── useSignup.ts     // (createUserWithEmailAndPassword のロジック)