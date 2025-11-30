import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const Header: React.FC = () => {
  const { currentUser, handleSignOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = async () => {
    await handleSignOut();
    navigate("/login");
  };

  // ホーム画面かどうかを判定
  const isHomePage = location.pathname === "/";

  return (
    <header className="header">
      {/* ロゴ (クリックでホームへ戻る) */}
      <Link to="/" className="header-logo">
        uttc
      </Link>

      {/* ホーム画面でのみ表示 */}
      {isHomePage && (
        <div className="header-nav">
          {/* ログイン状態による出し分け */}
          {currentUser ? (
            /* ログイン中 */
            <button
              onClick={onLogout}
              className="text-button"
              style={{ margin: 0 }}
            >
              ログアウト
            </button>
          ) : (
            /* 未ログイン */
            <>
              <Link to="/login" className="secondary-button header-button">
                ログイン
              </Link>
              <Link to="/signup" className="secondary-button header-button">
                会員登録
              </Link>
            </>
          )}

          {/* 出品ボタン */}
          <Link to="/sell" className="primary-button header-button">
            出品
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
