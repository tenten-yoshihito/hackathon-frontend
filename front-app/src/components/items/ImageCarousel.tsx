// src/components/items/ImageCarousel.tsx

import React, { useState, useEffect } from "react";
import styles from "./ImageCarousel.module.css";

interface Props {
  images: string[];
  alt: string;
}

const ImageCarousel: React.FC<Props> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 画像を裏で先読みする関数
  useEffect(() => {
    if (!images || images.length <= 1) return;

    // 次の画像と前の画像のインデックスを計算
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    // 画像オブジェクトを作って読み込ませる（ブラウザのキャッシュに乗る）
    const preloadImg1 = new Image();
    preloadImg1.src = images[nextIndex];
    
    const preloadImg2 = new Image();
    preloadImg2.src = images[prevIndex];

  }, [currentIndex, images]);

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
        loading="lazy"
        decoding="async"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className={`${styles.arrow} ${styles.arrowLeft}`}
            type="button"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className={`${styles.arrow} ${styles.arrowRight}`}
            type="button"
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