// src/lib/api.ts

export const registerUserToBackend = async (
  token: string,
  name: string,
  email: string,
  iconUrl: string = ""
) => {
  const baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  const res = await fetch(`${baseUrl}/register`, {
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
