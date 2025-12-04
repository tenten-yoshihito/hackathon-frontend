// src/components/items/ImageUploader.tsx

import React, { ChangeEvent } from "react";
import styles from "./ImageUploader.module.css";

interface Props {
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
  previews: string[];
}

const ImageUploader: React.FC<Props> = ({ onImageChange, onImageRemove, previews }) => {
  return (
    <div className={styles.container}>
      <p className="form-label">商品画像 (複数選択可)</p>

      {/* labelをクリックすると、隠れたinputが反応 */}
      <label className={styles.uploadButton}>
        + 画像を追加する
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageChange}
          className={styles.hiddenInput}
        />
      </label>

      {/* プレビュー表示エリア */}
      <div className={styles.previewGrid}>
        {previews.length === 0 && (
          <span className={styles.noImageText}>
            画像はまだありません
          </span>
        )}

        {previews.map((src, index) => (
          <div key={index} className={styles.previewWrapper}>
            <img
              src={src}
              alt={`preview-${index}`}
              className={styles.previewImage}
            />
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => onImageRemove(index)}
              aria-label="画像を削除"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
