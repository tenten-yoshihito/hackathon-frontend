// src/pages/Home.tsx

import React, { useEffect, useState } from "react";
import { getItemList, ItemSimple } from "lib/api/item_list";
import ItemGrid from "components/items/ItemGrid";

const Home: React.FC = () => {
  const [items, setItems] = useState<ItemSimple[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItemList();
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container-lg">
      <h2 className="page-title text-left">
        新着商品
      </h2>
      {loading ? (
        <p className="center-text">読み込み中...</p>
      ) : (
        <ItemGrid items={items} />
      )}
    </div>
  );
};

export default Home;
