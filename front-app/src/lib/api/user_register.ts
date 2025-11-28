// src/lib/user_register.ts
import { getBaseUrl } from "./client";

export const registerUserToBackend = async (
  token: string,
  name: string,
  email: string,
  iconUrl: string = ""
) => {
  const res = await fetch(`${getBaseUrl()}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name || "No Name",
      age: -1, // 年齢は未設定(-1)で固定
      email: email,
      icon_url: iconUrl,
    }),
  });

  if (!res.ok) {
    throw new Error("サーバーへの登録に失敗しました");
  }

  return res;
};
