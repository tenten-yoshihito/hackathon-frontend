import React, { useState, useMemo } from "react";
import { useLikes } from "hooks/useLikes";
import { useAuth } from "hooks/useAuth";
import { useHomeData, TabType } from "hooks/useHomeData";
import ItemGrid from "components/items/ItemGrid";
import TabNavigation from "components/common/TabNavigation";
import styles from "./Home.module.css";

type StatusFilter = "all" | "on_sale";
type SortOption = "newest" | "price_low" | "price_high";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { currentUser } = useAuth();
  
  const { displayItems, loading, hasMore, loadMore, loadingMore } = useHomeData(activeTab);
  const { likedItemIds, toggleLike, checkIsLiked } = useLikes();
  
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // フィルターとソートを適用
  const filteredAndSortedItems = useMemo(() => {
    let result = [...displayItems];

    // ステータスフィルター
    if (statusFilter === "on_sale") {
      result = result.filter((item) => item.status === "ON_SALE");
    }

    // ソート
    switch (sortOption) {
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        // 既に新着順なのでそのまま
        break;
    }

    return result;
  }, [displayItems, statusFilter, sortOption]);

  return (
    <div className="container-lg">
      <div className={styles.contentWrapper}>
        {/* 左側: フィルター・ソート (Sidebar) */}
        <aside className={styles.sidebar}>
          {/* ステータスフィルター */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>表示</h3>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="status"
                value="all"
                checked={statusFilter === "all"}
                onChange={() => setStatusFilter("all")}
              />
              <span>全て表示</span>
            </label>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="status"
                value="on_sale"
                checked={statusFilter === "on_sale"}
                onChange={() => setStatusFilter("on_sale")}
              />
              <span>販売中のみ</span>
            </label>
          </div>

          {/* ソート */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>並び替え</h3>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="sort"
                value="newest"
                checked={sortOption === "newest"}
                onChange={() => setSortOption("newest")}
              />
              <span>新着順</span>
            </label>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="sort"
                value="price_low"
                checked={sortOption === "price_low"}
                onChange={() => setSortOption("price_low")}
              />
              <span>価格が安い順</span>
            </label>
            <label className={styles.filterOption}>
              <input
                type="radio"
                name="sort"
                value="price_high"
                checked={sortOption === "price_high"}
                onChange={() => setSortOption("price_high")}
              />
              <span>価格が高い順</span>
            </label>
          </div>
        </aside>

        {/* 右側: メインカラム (タブ + 商品一覧) */}
        <div className={styles.mainColumn}>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <main className={styles.mainContent}>
            {activeTab === "recommend" && !currentUser ? (
              <div className={styles.loginPromptContainer}>
                <p className={styles.loginPromptText}>
                  ログインするとあなたへのおすすめが表示されます
                </p>
                <button
                  className="primary-button"
                  onClick={() => window.location.href = "/login"}
                >
                  ログイン
                </button>
              </div>
            ) : loading ? (
              <p className="center-text">読み込み中...</p>
            ) : (
              <>
                <ItemGrid
                  items={filteredAndSortedItems}
                  likedItemIds={likedItemIds}
                  onLikeClick={toggleLike}
                  checkIsLiked={checkIsLiked}
                />
                
                {/* Load More Button for 'all' tab */}
                {activeTab === "all" && hasMore && (
                  <div className={styles.loadMoreContainer}>
                    <button 
                      className="secondary-button" 
                      onClick={loadMore}
                      disabled={loadingMore}
                    >
                      {loadingMore ? "読み込み中..." : "もっと見る"}
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
