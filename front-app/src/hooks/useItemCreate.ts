// src/hooks/useItemCreate.ts

import { useState, ChangeEvent, FormEvent } from "react";
import { fireAuth, fireStorage } from "lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createItemInBackend } from "lib/api/item_register";
import { useNavigate } from "react-router-dom";

export const useItemCreate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]); 
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // 画像が選択されたときの処理
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      // 画像リストの更新 
      setImages((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);

      // 💡 重要: inputの値をリセットする
      // これをしないと、同じファイルを連続で選んだ時に反応しなくなります
      e.target.value = "";
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = fireAuth.currentUser;
      if (!user) throw new Error("ログインしていません");

      const token = await user.getIdToken();

      // 画像をFirebase StorageにアップロードしてURLを取得 
      // Promise.allを使って並列でアップロードします
      const imageUrls = await Promise.all(
        images.map(async (file) => {
          // ファイル名が被らないようにランダムな文字列や時間を付与
          const fileName = `${Date.now()}_${file.name}`;
          const storageRef = ref(fireStorage, `items/${user.uid}/${fileName}`);

          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );

      // 取得したURLと商品データをGoサーバーへ送信 
      await createItemInBackend(token, {
        name: name,
        price: parseInt(price), // 文字列を数値に変換
        description: description,
        image_urls: imageUrls,
      });

      alert("出品が完了しました！");
      navigate("/"); // ホームへ戻る 
    } catch (err) {
      console.error(err);
      alert("出品に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    images,
    previews,
    handleImageChange,
    onSubmit,
    isLoading,
  };
};
