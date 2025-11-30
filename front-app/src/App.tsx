//src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignupPage";
import ItemCreatePage from "pages/ItemCreatePage";
import Home from "pages/Home";
import Header from "components/common/Header";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
