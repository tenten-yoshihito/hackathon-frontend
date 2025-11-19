import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <h1>hello react router</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>home</h2>;
}


export default App;
