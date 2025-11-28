import React, { ChangeEvent } from "react";
import styles from "./ImageUploader.module.css";

interface Props {
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  previews: string[];
}

const ImageUploader: React.FC<Props> = ({ onImageChange, previews }) => {
  return (
    <div className={styles.container}>
      <label className="form-label">商品画像 (複数選択可)</label>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onImageChange}
        className={styles.fileInput}
      />

      {/* プレビュー表示エリア */}
      <div className={styles.previewGrid}>
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
