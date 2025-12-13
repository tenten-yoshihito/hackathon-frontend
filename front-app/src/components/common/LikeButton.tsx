// src/components/common/LikeButton.tsx

import React from "react";
import styles from "./LikeButton.module.css";

interface LikeButtonProps {
  isLiked: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onClick }) => {
  return (
    <button
      className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
      onClick={onClick}
      aria-label={isLiked ? "いいねを解除" : "いいねする"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isLiked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
};

export default LikeButton;
