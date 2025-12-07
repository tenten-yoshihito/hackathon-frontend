// src/components/common/TabNavigation.tsx

import React from "react";
import styles from "./TabNavigation.module.css";

interface TabNavigationProps {
  activeTab: "all" | "my";
  onTabChange: (tab: "all" | "my") => void;
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
    </div>
  );
};

export default TabNavigation;
