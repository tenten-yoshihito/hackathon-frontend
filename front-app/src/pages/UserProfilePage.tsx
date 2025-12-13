// src/pages/UserProfilePage.tsx

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useUserProfile } from "hooks/useUserProfile";
import { useAuth } from "hooks/useAuth";
import ItemGrid from "components/items/ItemGrid";
import { DEFAULT_USER_ICON } from "constants/images";
import styles from "./UserProfilePage.module.css";

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, items, loading, error } = useUserProfile(userId || "");
  const { currentUser } = useAuth();

  // 自分のプロフィールかどうか判定
  const isOwnProfile = currentUser?.uid === userId;

  if (loading) {
    return <div className={styles.container}>読み込み中...</div>;
  }

  if (error || !user) {
    return <div className={styles.container}>{error || "ユーザーが見つかりません"}</div>;
  }

  return (
    <div className={styles.container}>
      {/* プロフィールカード */}
      <div className={styles.profileCard}>
        <img
          src={user.icon_url || DEFAULT_USER_ICON}
          alt={user.name}
          className={styles.icon}
        />
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>{user.name}</h1>
            {isOwnProfile && (
              <Link to="/profile/edit" className={styles.editButton}>
                プロフィールを編集
              </Link>
            )}
          </div>
          {user.bio && <p className={styles.bio}>{user.bio}</p>}
        </div>
      </div>

      {/* 出品した商品一覧 */}
      <div className={styles.itemsSection}>
        <h2 className={styles.sectionTitle}>出品した商品</h2>
        {items.length > 0 ? (
          <ItemGrid items={items} />
        ) : (
          <p className={styles.emptyMessage}>出品した商品はまだありません</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
