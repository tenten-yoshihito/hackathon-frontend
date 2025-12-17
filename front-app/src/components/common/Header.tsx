import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { useCurrentUserData } from "hooks/useCurrentUserData";
import { useNotifications } from "hooks/useNotifications";
import { DEFAULT_USER_ICON } from "constants/images";
import NotificationModal from "components/notification/NotificationModal";
import { SearchIcon } from "components/common/SearchIcon";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  const { currentUser, handleSignOut } = useAuth();
  const { userData } = useCurrentUserData();
  const { unreadCount, loadUnreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onLogout = async () => {
    await handleSignOut();
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchKeyword.trim())}`);
      setSearchKeyword("");
    }
  };

  // ホーム画面かどうかを判定
  const isHomePage = location.pathname === "/";

  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className={styles.header}>
      {/* ロゴ (クリックでホームへ戻る) */}
      <Link to="/" className={styles.logo}>
        uttc
      </Link>

      {/* 検索フォーム */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          id="search-input"
          name="keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="商品を検索"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton} aria-label="検索">
          <SearchIcon className={styles.searchIconSvg} />
        </button>
      </form>

      {/* ホーム画面でのみ表示 */}
      {isHomePage && (
        <div className={styles.nav}>
          {/* ログイン状態による出し分け */}
          {currentUser ? (
            <>
              {/* 通知ベルアイコン */}
              <div className={styles.notificationWrapper}>
                <button
                  onClick={() => setIsNotificationOpen(true)}
                  className={styles.notificationButton}
                  aria-label="通知"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount}</span>
                  )}
                </button>
              </div>

              {/* ユーザーアイコンとドロップダウン */}
              <div className={styles.userMenu} ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={styles.userIconButton}
                  aria-label="ユーザーメニュー"
                >
                  <img
                    src={
                      (userData?.icon_url && 
                       (userData.icon_url.startsWith("http") || userData.icon_url.startsWith("/")) 
                      ) ? userData.icon_url : DEFAULT_USER_ICON
                    }
                    alt={userData?.name || currentUser.displayName || "ユーザー"}
                    className={styles.userIcon}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_USER_ICON;
                      // 無限ループ防止
                      target.onerror = null;
                    }}
                  />
                </button>

                {isDropdownOpen && (
                  <div className={styles.dropdown}>
                    <Link
                      to={`/users/${currentUser.uid}`}
                      className={styles.dropdownItem}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      プロフィール
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      className={styles.dropdownItem}
                    >
                      ログアウト
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* 未ログイン */
            <>
              <Link to="/login" className={`secondary-button ${styles.button}`}>
                ログイン
              </Link>
              <Link to="/signup" className={`secondary-button ${styles.button}`}>
                会員登録
              </Link>
            </>
          )}

          {/* 出品ボタン */}
          <Link to="/sell" className={`primary-button ${styles.button}`}>
            出品
          </Link>
        </div>
      )}

      {/* 通知モーダル */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onUpdateUnreadCount={loadUnreadCount}
      />
    </header>
  );
};

export default Header;
