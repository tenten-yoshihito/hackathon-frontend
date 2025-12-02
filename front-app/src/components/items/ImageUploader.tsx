// src/components/items/ImageUploader.tsx

import React, { ChangeEvent } from "react";
import styles from "./ImageUploader.module.css";

interface Props {
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  previews: string[];
}

const ImageUploader: React.FC<Props> = ({ onImageChange, previews }) => {
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
          <img
            key={index}
            src={src}
            alt={`preview-${index}`}
            className={styles.previewImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
