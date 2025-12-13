// src/lib/api/user.ts

import { getIdToken } from "../firebaseConfig";
import { getBaseUrl } from "./client";

export interface User {
  id: string;
  name: string;
  age: number;
  bio?: string;
  icon_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserUpdateRequest {
  name: string;
  age: number;
  bio: string;
  icon_url: string;
}

//指定されたIDのユーザー情報を取得
export const fetchUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${getBaseUrl()}/users/${userId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

//自分のプロフィール情報を更新
export const updateUserProfile = async (data: UserUpdateRequest): Promise<void> => {
  const token = await getIdToken();

  const response = await fetch(`${getBaseUrl()}/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }
};
