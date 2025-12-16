// src/hooks/useItemUpdate.ts

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateItem } from "lib/api/item_update";
import { fireAuth, fireStorage } from "lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";

export const useItemUpdate = (itemId: string | undefined) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent,
    name: string,
    price: string,
    description: string,
    imageUrls: string[],
    imageFiles: File[]
  ) => {
    e.preventDefault();

    if (!itemId) {
      alert("商品IDが見つかりません");
      return;
    }

    setIsLoading(true);
    try {
      const user = fireAuth.currentUser;
      if (!user) throw new Error("ログインしていません");

      // 画像URLの処理：blob URLは新しくアップロード、それ以外はそのまま使用
      const finalImageUrls = await Promise.all(
        imageUrls.map(async (url, index) => {
          // blob URLの場合は新しくアップロード
          if (url.startsWith("blob:")) {
            const file = imageFiles[index];
            if (!file) {
              console.error("File not found for blob URL");
              return url;
            }

            try {
              let uploadFile = file;
              
              // 画像圧縮
              const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 512,
                useWebWorker: true,
              };
              const compressedFile = await imageCompression(file, options);
              uploadFile = compressedFile;

              const fileName = `${Date.now()}_${file.name}`;
              const storageRef = ref(fireStorage, `items/${user.uid}/${fileName}`);
              
              await uploadBytes(storageRef, uploadFile);
              return await getDownloadURL(storageRef);
            } catch (error) {
              console.error("Image upload failed:", error);
              return url;
            }
          }
          
          // 既存のFirebase Storage URLはそのまま使用
          return url;
        })
      );

      await updateItem(itemId, {
        name,
        price: parseInt(price),
        description,
        image_urls: finalImageUrls,
      });

      alert("商品を更新しました！");
      navigate(`/items/${itemId}`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
};
