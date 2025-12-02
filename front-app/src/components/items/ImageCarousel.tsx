// src/components/items/ImageCarousel.tsx

import React, { useState } from "react";
import styles from "./ImageCarousel.module.css";

interface Props {
  images: string[];
  alt: string;
}

const ImageCarousel: React.FC<Props> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 画像がない場合
  if (!images || images.length === 0) {
    return (
      <div className={styles.container}>
        <span className={styles.noImage}>No Image</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={styles.container}>
      <img
        src={images[currentIndex]}
        alt={`${alt}-${currentIndex}`}
        className={styles.image}
      />

      {/* 画像が2枚以上あるときだけ矢印とドットを表示 */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className={`${styles.arrow} ${styles.arrowLeft}`}
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className={`${styles.arrow} ${styles.arrowRight}`}
          >
            ›
          </button>

          <div className={styles.dots}>
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`${styles.dot} ${
                  idx === currentIndex ? styles.dotActive : ""
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
