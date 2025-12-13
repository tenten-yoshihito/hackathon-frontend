// src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import { fetchItems, ItemSimple } from "lib/api/item_list";
import { getLikedItems } from "lib/api/like";
import { useMyItems } from "hooks/useMyItems";
import { useLikes } from "hooks/useLikes";
import ItemGrid from "components/items/ItemGrid";
import TabNavigation from "components/common/TabNavigation";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "my" | "liked">("all");
  const [allItems, setAllItems] = useState<ItemSimple[]>([]);
  const [likedItems, setLikedItems] = useState<ItemSimple[]>([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingLiked, setLoadingLiked] = useState(false);
  const { items: myItems, loading: loadingMy } = useMyItems();
  const { likedItemIds, toggleLike, checkIsLiked } = useLikes();

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setAllItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAll(false);
      }
    };

    loadItems();
  }, []);

  // いいねタブが選択されたときにいいね商品を取得
  useEffect(() => {
    if (activeTab === "liked") {
      const loadLikedItems = async () => {
        try {
          setLoadingLiked(true);
          const data = await getLikedItems();
          setLikedItems(data);
        } catch (err) {
          console.error("Failed to load liked items:", err);
        } finally {
          setLoadingLiked(false);
        }
      };

      loadLikedItems();
    }
  }, [activeTab]);

  const displayItems =
    activeTab === "all" ? allItems : activeTab === "my" ? myItems : likedItems;
  const loading =
    activeTab === "all"
      ? loadingAll
      : activeTab === "my"
      ? loadingMy
      : loadingLiked;

  return (
    <div className="container-lg">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {loading ? (
        <p className="center-text">読み込み中...</p>
      ) : (
        <ItemGrid
          items={displayItems}
          likedItemIds={likedItemIds}
          onLikeClick={toggleLike}
          checkIsLiked={checkIsLiked}
        />
      )}
    </div>
  );
};

export default Home;
