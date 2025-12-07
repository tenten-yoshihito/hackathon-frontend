// src/components/items/ItemCreateForm.tsx

import React, { FormEvent, ChangeEvent } from "react";
import ImageUploader from "./ImageUploader";

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
}

const ItemCreateForm: React.FC<Props> = (props) => {
  return (
    <form onSubmit={props.onSubmit} className="container-sm">
      <h2 className="page-title">商品の出品</h2>

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label className="form-label">商品の説明 (任意)</label>
          <button
            type="button"
            onClick={props.handleGenerateDescription}
            disabled={props.isGenerating || props.previews.length === 0}
            className="secondary-button"
            style={{ marginTop: 0, fontSize: "14px", padding: "8px 16px" }}
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
        {props.isLoading ? "出品中..." : props.isGenerating ? "生成中..." : "出品する"}
      </button>
    </form>
  );
};

export default ItemCreateForm;
