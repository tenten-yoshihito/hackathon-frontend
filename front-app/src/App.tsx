//src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignupPage";
import ItemCreatePage from "pages/ItemCreatePage";
import ItemEditPage from "pages/ItemEditPage";
import Home from "pages/Home";
import Header from "components/common/Header";
import ItemDetailPage from "pages/ItemDetailPage";
import ChatPage from "pages/ChatPage";
import { AuthGuard } from "components/auth/AuthGuard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/sell"
          element={
            <AuthGuard>
              <ItemCreatePage />
            </AuthGuard>
          }
        />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route
          path="/items/:id/edit"
          element={
            <AuthGuard>
              <ItemEditPage />
            </AuthGuard>
          }
        />
        <Route
          path="/chats/:roomId"
          element={
            <AuthGuard>
              <ChatPage />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
