// src/pages/ProfileEditPage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfileEdit } from "hooks/useProfileEdit";
import styles from "./ProfileEditPage.module.css";

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, formData, handlers, isSubmitting } = useProfileEdit();

  if (loading) {
    return <p className="center-text">読み込み中...</p>;
  }

  if (error) {
    return (
      <div className={`container-sm ${styles.errorContent}`}>
        <p className={styles.errorMessage}>{error}</p>
        <button
          className={`secondary-button w-full ${styles.backButton}`}
          onClick={() => navigate("/")}
        >
          ホームに戻る
        </button>
      </div>
    );
  }

  return (
    <div className="container-sm">
      <div className={styles.formContainer}>
        <h1 className={styles.title}>プロフィール編集</h1>

        <form onSubmit={handlers.handleSubmit} className={styles.form}>
          {/* 名前 */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              名前 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handlers.setName(e.target.value)}
              className={styles.input}
              placeholder="山田太郎"
              maxLength={50}
              required
            />
          </div>

          {/* 年齢 */}
          <div className={styles.formGroup}>
            <label htmlFor="age" className={styles.label}>
              年齢
            </label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={(e) => handlers.setAge(e.target.value)}
              className={styles.input}
              placeholder="未設定"
              min="1"
              max="150"
            />
          </div>

          {/* 自己紹介 */}
          <div className={styles.formGroup}>
            <label htmlFor="bio" className={styles.label}>
              自己紹介
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handlers.setBio(e.target.value)}
              className={styles.textarea}
              placeholder="よろしくお願いします"
              maxLength={500}
              rows={5}
            />
            <p className={styles.charCount}>{formData.bio.length} / 500</p>
          </div>

          {/* アイコン画像 */}
          <div className={styles.formGroup}>
            <label htmlFor="icon" className={styles.label}>
              アイコン画像
            </label>
            <input
              type="file"
              id="icon"
              accept="image/*"
              onChange={handlers.handleIconChange}
              className={styles.fileInput}
            />
            {formData.iconPreview && (
              <div className={styles.iconPreview}>
                <img
                  src={formData.iconPreview}
                  alt="プレビュー"
                  className={styles.previewImage}
                  onError={(e) => {
                    e.currentTarget.src = "/default_user_icon.png";
                  }}
                />
              </div>
            )}
          </div>

          {/* ボタン */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`secondary-button ${styles.cancelButton}`}
              disabled={isSubmitting}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className={`primary-button ${styles.submitButton}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "更新中..." : "更新する"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
