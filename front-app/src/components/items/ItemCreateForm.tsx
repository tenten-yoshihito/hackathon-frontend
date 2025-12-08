// src/components/items/ItemCreateForm.tsx

import React, { FormEvent, ChangeEvent } from "react";
import ImageUploader from "./ImageUploader";
import styles from "./ItemCreateForm.module.css";

interface Props {
  name: string;
  setName: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  previews: string[];
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (index: number) => void;
  handleGenerateDescription: () => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  isGenerating: boolean;
  // 編集モード対応のオプショナルprops
  mode?: "create" | "edit";
  submitButtonText?: string;
  pageTitle?: string;
}

const ItemCreateForm: React.FC<Props> = ({
  mode = "create",
  submitButtonText,
  pageTitle,
  ...props
}) => {
  // モードに応じたテキストを決定
  const title = pageTitle || (mode === "create" ? "商品の出品" : "商品の編集");
  const buttonText = submitButtonText || (mode === "create" ? "出品する" : "更新する");
  const loadingText = mode === "create" ? "出品中..." : "更新中...";

  return (
    <form onSubmit={props.onSubmit} className="container-sm">
      <h2 className="page-title">{title}</h2>

      {/* 画像アップロード部品 */}
      <ImageUploader
        onImageChange={props.handleImageChange}
        onImageRemove={props.handleImageRemove}
        previews={props.previews}
      />

      <div className="form-group">
        <label className="form-label">商品名</label>
        <input
          type="text"
          className="form-input"
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
          required
          placeholder="例: おしゃれなスニーカー"
        />
      </div>

      <div className="form-group">
        <label className="form-label">価格 (円)</label>
        <input
          type="number"
          className="form-input"
          value={props.price}
          onChange={(e) => props.setPrice(e.target.value)}
          required
          placeholder="1000"
        />
      </div>

      <div className="form-group">
        <div className={styles.labelRow}>
          <label className="form-label">商品の説明 (任意)</label>
          <button
            type="button"
            onClick={props.handleGenerateDescription}
            disabled={props.isGenerating || props.previews.length === 0}
            className={`secondary-button ${styles.generateButton}`}
          >
            {props.isGenerating ? "生成中..." : "✨ AIで説明を自動生成"}
          </button>
        </div>
        <textarea
          className="form-textarea"
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          placeholder="色、サイズ、状態などを記載しましょう"
        />
      </div>

      <button
        type="submit"
        disabled={props.isLoading || props.isGenerating}
        className="primary-button"
      >
        {props.isLoading ? loadingText : props.isGenerating ? "生成中..." : buttonText}
      </button>
    </form>
  );
};

export default ItemCreateForm;
