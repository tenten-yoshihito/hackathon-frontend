// src/components/common/TabNavigation.tsx

import React from "react";
import styles from "./TabNavigation.module.css";

interface TabNavigationProps {
  activeTab: "all" | "my" | "liked" | "recommend";
  onTabChange: (tab: "all" | "my" | "liked" | "recommend") => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabContainer}>
      <button
        className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
        onClick={() => onTabChange("all")}
      >
        新着商品
      </button>
      <button
        className={`${styles.tab} ${activeTab === "my" ? styles.active : ""}`}
        onClick={() => onTabChange("my")}
      >
        出品した商品
      </button>
      <button
        className={`${styles.tab} ${activeTab === "liked" ? styles.active : ""}`}
        onClick={() => onTabChange("liked")}
      >
        いいねした商品
      </button>
      <button
        className={`${styles.tab} ${activeTab === "recommend" ? styles.active : ""}`}
        onClick={() => onTabChange("recommend")}
      >
        おすすめ
      </button>
    </div>
  );
};

export default TabNavigation;
