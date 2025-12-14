# Frontend Architecture Documentation

## 📁 プロジェクト構成

```
front-app/
├── public/                # 静的ファイル (index.html, robots.txtなど)
├── src/
│   ├── App.tsx           # ルーティング定義とアプリケーション全体のレイアウト設定
│   ├── index.tsx         # アプリケーションのエントリーポイント
│   ├── index.css         # グローバルスタイル定義 (CSS Variables, Reset CSS)
│   ├── components/       # 再利用可能なUIコンポーネント (Presentational Layer)
│   ├── pages/            # ページコンポーネント (Container Layer)
│   ├── hooks/            # カスタムフック (Business Logic Layer)
│   ├── lib/              # 外部ライブラリ設定、APIクライアント (Data Access Layer)
│   ├── types/            # TypeScript型定義
│   └── constants/        # 定数定義
└── package.json          # 依存関係定義
```

## アーキテクチャパターン

### コンポーネント指向アーキテクチャ

データの流れと関心事の分離を明確にするため、以下のレイヤー構成を採用しています：

1.  **Presentation Layer (View)**
    *   `pages/`: ページ単位のコンポーネント。ルーティングに対応し、データ取得のトリガーやレイアウトを管理
    *   `components/`: 見た目とUIインタラクションを担当する再利用可能な部品。ビジネスロジックは持たず、Propsでデータを受け取る

2.  **Business Logic Layer (Logic)**
    *   `hooks/`: コンポーネントからロジックを分離。状態管理（State）、副作用（Effect）、APIコールのハンドリング

3.  **Data Access Layer (Infrastructure)**
    *   `lib/api/`: バックエンドAPIとの通信を担当。HTTPリクエストの構築、エラーハンドリング

```
Page (pages/) 
  │  Uses
  ▼
Hook (hooks/) 
  │  Calls
  ▼
API Client (lib/api/) 
  │  Requests
  ▼
Backend Server
```

---

## 📂 ディレクトリ詳細

### 1. `pages/` (ページレイヤー)
ルーティングごとのエントリーポイントとなるコンポーネント群です。

*   **メイン機能**
    *   `Home.tsx`: トップページ。商品一覧の表示、タブ切り替え（すべて/出品した商品/いいねした商品）。
    *   `SearchPage.tsx`: 商品検索結果ページ。キーワード検索結果の表示。
    *   `ItemDetailPage.tsx`: 商品詳細ページ。商品の詳細情報表示、購入/チャットへの導線。
    *   `ItemCreatePage.tsx`: 商品出品ページ。画像のアップロード、商品情報の入力。
    *   `ItemEditPage.tsx`: 商品編集ページ。既存商品情報の更新。
    *   `ChatPage.tsx`: チャットルームページ。購入者・出品者間のメッセージやり取り。

*   **ユーザー管理**
    *   `UserProfilePage.tsx`: ユーザープロフィールページ。ユーザー情報と出品商品一覧。
    *   `ProfileEditPage.tsx`: プロフィール編集ページ。ユーザー情報の更新。
    *   `LoginPage.tsx`: ログインページ。
    *   `SignupPage.tsx`: 新規会員登録ページ。

### 2. `components/` (コンポーネントレイヤー)
UIパーツを機能ごとに分類しています。

*   **`common/`** (汎用コンポーネント)
    *   `Header.tsx`: アプリケーションヘッダー。ナビゲーション、検索バーを含む。
    *   `TabNavigation.tsx`: コンテンツ切り替え用のタブUI。
    *   `LikeButton.tsx`: いいね機能を持つ再利用可能なボタン。

*   **`items/`** (商品関連)
    *   `ItemGrid.tsx`: 商品カードをグリッド状に並べて表示するリストコンポーネント。
    *   `ItemDescription.tsx`: 商品説明文の表示コンポーネント。
    *   `ItemCreateForm.tsx`: 商品出品・編集用のフォーム。
    *   `ImageUploader.tsx`: 画像選択・プレビュー機能。
    *   `ImageCarousel.tsx`: 商品詳細での画像スライダー。
    *   `PurchaseModal.tsx`: 購入確認用モーダル。
    *   `ChatListModal.tsx`: チャットルーム一覧を表示するモーダル。

*   **`auth/`** (認証関連)
    *   `AuthGuard.tsx`: ログイン必須ページの保護を行うラッパーコンポーネント。
    *   `SignupForm.tsx`, `PasswordLoginForm.tsx`, `GoogleLoginForm.tsx`: 認証フォーム。

### 3. `hooks/` (ロジックレイヤー)
コンポーネントからロジックを切り出し、再利用可能にしています。

*   **データ取得・管理**
    *   `useMyItems.ts`: ログインユーザーの出品商品取得。
    *   `useItemDetail.ts`: 特定商品の詳細情報取得。
    *   `useLikes.ts`: いいねの状態管理とAPI呼び出し。
    *   `useUserProfile.ts`: ユーザー情報の取得。
    *   `useChatRoom.ts`: チャットルーム情報の取得。
    *   `useItemChat.ts`: 商品に関連するチャットルームの管理。

*   **アクション・操作**
    *   `useItemCreate.ts`: 商品出品処理（画像アップロード含む）。
    *   `useItemPurchase.ts`: 商品購入処理。
    *   `useItemUpdate.ts`: 商品更新処理。
    *   `useProfileEdit.ts`: プロフィール更新処理。
    *   `useSignup.ts`: 会員登録処理。

*   **共通**
    *   `useAuth.ts`: Firebase Authenticationを使用した認証状態の監視とユーザー情報の提供。

### 4. `lib/` (ライブラリ・APIレイヤー)
外部システムとの連携を担当します。

*   **`api/`**: バックエンドAPIのエンドポイント定義。
    *   `client.ts`: APIクライアントのベース設定（Base URLなど）。
    *   `item_list.ts`: 商品一覧取得 (`GET /items`)。
    *   `item_detail.ts`: 商品詳細取得 (`GET /items/:id`)。
    *   `item_register.ts`: 商品登録 (`POST /items`)。
    *   `like.ts`: いいね操作 (`POST /items/:id/like`, `GET /items/:id/like`).
    *   `chat.ts`: チャット関連 (`GET /chats`, `POST /chats/messages`).
    *   `purchase.ts`: 購入処理 (`POST /items/:id/purchase`).
    *   etc...

*   `firebaseConfig.ts`: Firebase SDKの初期化設定。

---

##  データフローの例

### 商品詳細ページを表示する流れ

1.  **Page (`ItemDetailPage.tsx`)**
    *   詳細ページがマウントされる。
    *   URLパラメータから `itemId` を取得。
    *   カスタムフック `useItemDetail(itemId)` を呼び出す。

2.  **Hook (`useItemDetail.ts`)**
    *   `useEffect` 内で APIクライアントの `fetchItemDetail` を呼び出す。
    *   ローディング状態 (`loading`) を `true` に設定。

3.  **API Client (`lib/api/item_detail.ts`)**
    *   バックエンド (`/items/:id`) へHTTPリクエストを送信。
    *   レスポンスを受け取り、JSONをパースして返す。

4.  **Hook (`useItemDetail.ts`)**
    *   データを受け取り、状態 (`item`) を更新。
    *   ローディング状態を `false` に設定。

5.  **Page (`ItemDetailPage.tsx`)**
    *   更新された `item` データを使って画面を描画。
    *   `ItemDetailFooter` などの子コンポーネントにデータを渡す。

---

