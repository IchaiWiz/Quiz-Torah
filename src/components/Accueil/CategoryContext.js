import React from 'react';

const CategoryContext = React.createContext({
  selectedCategory: null,
  selectedSubCategory: null,
  selectedSubSubCategory: null,
  selectedSubSubSubCategory: null,
  setSelectedCategory: () => {},
  setSelectedSubCategory: () => {},
  setSelectedSubSubCategory: () => {},
  setSelectedSubSubSubCategory: () => {},
});

export default CategoryContext;
