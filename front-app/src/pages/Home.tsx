// src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import { getItemList, ItemSimple } from "lib/api/item_list";
import { useMyItems } from "hooks/useMyItems";
import ItemGrid from "components/items/ItemGrid";
import TabNavigation from "components/common/TabNavigation";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "my">("all");
  const [allItems, setAllItems] = useState<ItemSimple[]>([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const { items: myItems, loading: loadingMy } = useMyItems();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItemList();
        setAllItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAll(false);
      }
    };

    fetchItems();
  }, []);

  const displayItems = activeTab === "all" ? allItems : myItems;
  const loading = activeTab === "all" ? loadingAll : loadingMy;

  return (
    <div className="container-lg">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {loading ? (
        <p className="center-text">読み込み中...</p>
      ) : (
        <ItemGrid items={displayItems} />
      )}
    </div>
  );
};

export default Home;
