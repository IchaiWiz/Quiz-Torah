import React, { useState, useEffect, useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CategoryContext from './CategoryContext';

export default function GroupedSelect({ isCategoryFromSearch, onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedSubSubCategory,
    setSelectedSubSubCategory,
    selectedSubSubSubCategory,
    setSelectedSubSubSubCategory
  } = useContext(CategoryContext);


  useEffect(() => {
    fetch('https://localhost:5000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://localhost:5000/sub_categories?category_id=${selectedCategory.id}`)
        .then(response => response.json())
        .then(data => setSubCategories(data))
        .catch(error => console.error('Error fetching subcategories:', error));
    }
}, [selectedCategory]);


useEffect(() => {
  if (selectedSubCategory) {
      fetch(`https://localhost:5000/sub_sub_categories?sub_category_id=${selectedSubCategory.id}`) // Utilisez .id ici
          .then(response => response.json())
          .then(data => setSubSubCategories(data))
          .catch(error => console.error('Error fetching sub-subcategories:', error));
  }
}, [selectedSubCategory]);

useEffect(() => {
  if (selectedSubSubCategory) {
    fetch(`https://localhost:5000/sub_sub_sub_categories?sub_sub_category_id=${selectedSubSubCategory.id}`) // Modifiez ceci pour utiliser .id
      .then(response => response.json())
      .then(data => setSubSubSubCategories(data))
      .catch(error => console.error('Error fetching sub-sub-subcategories:', error));
  }
}, [selectedSubSubCategory]);

useEffect(() => {
  if (isCategoryFromSearch) {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedSubSubCategory(null);
    setSelectedSubSubSubCategory(null);
    setSubCategories([]);
    setSubSubCategories([]);
    setSubSubSubCategories([]);
  }
}, [isCategoryFromSearch, setSelectedCategory, setSelectedSubCategory, setSelectedSubSubCategory, setSelectedSubSubSubCategory]);



  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120, borderColor: 'white !important', border: 2, borderRadius: 1 }}>
        <InputLabel shrink htmlFor="grouped-select-category"></InputLabel>
        <Select
          id="grouped-select-category"
          value={selectedCategory ? selectedCategory.id : ''}
          onChange={(event) => {
            const selectedCategoryId = event.target.value;
            const categoryObject = categories.find(category => category.id === selectedCategoryId);
            onCategorySelect(categoryObject);
            setSelectedCategory(categoryObject);
            setSelectedSubCategory(null);
            setSelectedSubSubCategory(null);
            setSelectedSubSubSubCategory(null);
            setSubSubCategories([]);
            setSubSubSubCategories([]);
          }}
          sx={{ color: "white" }}
        >
          <MenuItem value=""><em>Je m'arrête ici wesh</em></MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCategory && !isCategoryFromSearch && (
        <FormControl sx={{ m: 1, minWidth: 120, borderColor: 'white !important', border: 2, borderRadius: 1 }}>
          <InputLabel shrink htmlFor="grouped-select-sub-category"></InputLabel>
          <Select
            id="grouped-select-sub-category"
            value={selectedSubCategory ? selectedSubCategory.id : ''}
            onChange={(event) => {
              const selectedSubCategoryId = event.target.value;
              const subCategoryObject = subCategories.find(subCategory => subCategory.id === selectedSubCategoryId);
              setSelectedSubCategory(subCategoryObject);
              setSelectedSubSubCategory(null);
              setSelectedSubSubSubCategory(null);
              setSubSubSubCategories([]);
            }}
            sx={{ color: "white" }}
          >
            <MenuItem value=""><em>Je m'arrête ici...</em></MenuItem>
            {subCategories.map((subCategory) => (
              <MenuItem key={subCategory.id} value={subCategory.id}>{subCategory.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedSubCategory && (
        <FormControl sx={{ m: 1, minWidth: 120, borderColor: 'white !important', border: 2, borderRadius: 1 }}>
          <InputLabel shrink htmlFor="grouped-select-sub-sub-category"></InputLabel>
          <Select
            id="grouped-select-sub-sub-category"
            value={selectedSubSubCategory ? selectedSubSubCategory.id : ''}
            onChange={(event) => {
              const selectedSubSubCategoryId = event.target.value;
              const subSubCategoryObject = subSubCategories.find(subSubCategory => subSubCategory.id === selectedSubSubCategoryId);
              setSelectedSubSubCategory(subSubCategoryObject);
              setSelectedSubSubSubCategory(null);
            }}
            sx={{ color: "white" }}
          >
            <MenuItem value=""><em>Je m'arrête ici...</em></MenuItem>
            {subSubCategories.map((subSubCategory) => (
              <MenuItem key={subSubCategory.id} value={subSubCategory.id}>{subSubCategory.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedSubSubCategory && (
        <FormControl sx={{ m: 1, minWidth: 120, borderColor: 'white !important', border: 2, borderRadius: 1 }}>
          <InputLabel shrink htmlFor="grouped-select-sub-sub-sub-category"></InputLabel>
          <Select
            id="grouped-select-sub-sub-sub-category"
            value={selectedSubSubSubCategory ? selectedSubSubSubCategory.id : ''}
            onChange={(event) => {
              const selectedSubSubSubCategoryId = event.target.value;
              const subSubSubCategoryObject = subSubSubCategories.find(subSubSubCategory => subSubSubCategory.id === selectedSubSubSubCategoryId);
              setSelectedSubSubSubCategory(subSubSubCategoryObject);
            }}
            sx={{ color: "white" }}
          >
            <MenuItem value=""><em>Je m'arrête ici...</em></MenuItem>
            {subSubSubCategories.map((subSubSubCategory) => (
              <MenuItem key={subSubSubCategory.id} value={subSubSubCategory.id}>{subSubSubCategory.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
