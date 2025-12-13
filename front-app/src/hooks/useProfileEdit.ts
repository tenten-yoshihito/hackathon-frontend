// src/hooks/useProfileEdit.ts

import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { fetchUser, updateUserProfile, User } from "lib/api/user";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fireStorage } from "lib/firebaseConfig";

export const useProfileEdit = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // フォーム状態
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>("");

  // 現在のユーザー情報を取得
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) {
        // AuthGuardで保護されているので、ここには到達しないはず
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await fetchUser(currentUser.uid);
        setUser(userData);
        
        // フォームに現在の値を設定
        setName(userData.name || "");
        setAge(userData.age > 0 ? userData.age.toString() : "");
        setBio(userData.bio || "");
        setIconPreview(userData.icon_url || "");
      } catch (err) {
        console.error("Failed to load user data:", err);
        setError("ユーザー情報の読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [currentUser]);

  // 画像ファイル選択時の処理
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      // プレビュー用のURLを生成
      const previewUrl = URL.createObjectURL(file);
      setIconPreview(previewUrl);
    }
  };

  // プロフィール更新処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("名前を入力してください");
      return;
    }

    // 年齢のバリデーション
    const ageNum = age.trim() === "" ? -1 : parseInt(age, 10);
    if (age.trim() !== "" && (isNaN(ageNum) || ageNum < 1 || ageNum > 150)) {
      alert("年齢は1〜150の範囲で入力してください");
      return;
    }

    if (!currentUser) {
      alert("ログインが必要です");
      return;
    }

    try {
      setIsSubmitting(true);

      let iconURL = user?.icon_url || "";

      // 新しい画像がアップロードされた場合
      if (iconFile) {
        const storageRef = ref(fireStorage, `user_icons/${currentUser.uid}/${Date.now()}_${iconFile.name}`);
        await uploadBytes(storageRef, iconFile);
        iconURL = await getDownloadURL(storageRef);
      }

      await updateUserProfile({
        name: name.trim(),
        age: ageNum,
        bio: bio.trim(),
        icon_url: iconURL,
      });

      alert("プロフィールを更新しました");
      
      // ページをリロードして確実にヘッダーアイコンを更新
      if (currentUser) {
        window.location.href = `/users/${currentUser.uid}`;
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("プロフィールの更新に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    loading,
    error,
    user,
    formData: {
      name,
      age,
      bio,
      iconPreview,
    },
    handlers: {
      setName,
      setAge,
      setBio,
      handleIconChange,
      handleSubmit,
    },
    isSubmitting,
  };
};
