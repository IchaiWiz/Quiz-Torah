// components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ categoryData, onSearchSelect }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (result) => {
    setSearch('');
    onSearchSelect(result);  // update parent state on selection
  };

  const flattenCategories = (data) => {
    let categories = [];
    for (let category in data) {
      categories.push(category);
      for (let subCategory in data[category]) {
        categories.push(subCategory);
        categories.push(...data[category][subCategory]);
      }
    }
    return categories;
  };

  const categories = flattenCategories(categoryData);

  const results = categories
    .filter((category) =>
      category.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className='searchBar'>
      <input type="text" value={search} onChange={handleChange} placeholder="Rechercher une catégorie" />
      {search && results.map((result) => (
        <div onClick={() => handleSelect(result)} key={result}>
          {result}
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
