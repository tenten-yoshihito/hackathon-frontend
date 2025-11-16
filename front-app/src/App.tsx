import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "pages/LoginPage";
// import { Home } from "pages/Home";
// import { About } from "pages/About";
// import { Contact } from "pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <h1>hello react router</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>home</h2>;
}

function About() {
  return <h2>about</h2>;
}

function Contact() {
  return <h2>contact</h2>;
}

export default App;
