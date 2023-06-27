import React, { useState } from "react";
import "./App.css";
import CategoryContext from "./components/Accueil/CategoryContext";
import { Routes, Route } from "react-router-dom";
import Home from "../src/components/Accueil/Accueil";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);
  const [selectedSubSubSubCategory, setSelectedSubSubSubCategory] = useState(null);
  
  return (
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
      </Routes>
    </CategoryContext.Provider>
  );
}

export default App;
