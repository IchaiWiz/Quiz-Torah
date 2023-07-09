import React, { useState } from "react";
import "./App.css";
import CategoryContext from "./components/Accueil/CategoryContext";
import { Routes, Route } from "react-router-dom";
import Home from "../src/components/Accueil/Accueil";
import LoginPage from "./components/Login/loginpage";
import SignUp from "../src/components/SignUp/SignUpPage";
import Profil from "../src/components/Profil/profil";
import { AuthProvider } from "./components/AuthContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);
  const [selectedSubSubSubCategory, setSelectedSubSubSubCategory] =
    useState(null);

  return (
    <AuthProvider>
      <CategoryContext.Provider
        value={{
          selectedCategory,
          setSelectedCategory,
          selectedSubCategory,
          setSelectedSubCategory,
          selectedSubSubCategory,
          setSelectedSubSubCategory,
          selectedSubSubSubCategory,
          setSelectedSubSubSubCategory,
        }}
      >

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>

      </CategoryContext.Provider>
    </AuthProvider>
  );
}

export default App;
