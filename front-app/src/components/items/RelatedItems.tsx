import React, { useEffect, useState } from "react";
import { ItemSimple } from "lib/api/item_list";
import { getSimilarItems } from "lib/api/recommend";
import ItemGrid from "components/items/ItemGrid";
import { useLikes } from "hooks/useLikes";
import styles from "./RelatedItems.module.css";

interface Props {
  itemId: string;
}

const RelatedItems: React.FC<Props> = ({ itemId }) => {
  const [items, setItems] = useState<ItemSimple[]>([]);
  const [loading, setLoading] = useState(true);
  const { likedItemIds, toggleLike, checkIsLiked } = useLikes();

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const data = await getSimilarItems(itemId);
        const filtered = data.filter(item => item.id !== itemId);
        setItems(filtered);
      } catch (err) {
        console.error("Failed to fetch related items:", err);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchRelated();
    }
  }, [itemId]);

  if (loading) {
    //あえて表示はしないでおく
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        関連商品
      </h3>
      <ItemGrid
        items={items}
        likedItemIds={likedItemIds}
        onLikeClick={toggleLike}
        checkIsLiked={checkIsLiked}
      />
    </div>
  );
};

export default RelatedItems;
