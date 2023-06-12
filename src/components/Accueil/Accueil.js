// pages/Home.js
import React, { useState } from 'react';
import Layout from '../../Layout/layout';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import Button from './Button';
import './Accueil.css';

const categoryData = {
  'Fêtes juives': {
    'Pourim': ['Lois de la fête de Pourim', 'Coutumes de la fête de Pourim', 'Histoire de la fête de Pourim'],
    'Pessah': ['Lois de la fête de Pessah', 'Coutumes de la fête de Pessah', 'Histoire de la fête de Pessah'],
    'Chavouot': ['Lois de la fête de Chavouot', 'Coutumes de la fête de Chavouot', 'Histoire de la fête de Chavouot'],
    'Souccot': ['Lois de la fête de Souccot', 'Coutumes de la fête de Souccot', 'Histoire de la fête de Souccot'],
    'Hanouka': ['Lois de la fête de Hanouka', 'Coutumes de la fête de Hanouka', 'Histoire de la fête de Hanouka'],
    'Ticha Beav': ['Lois de Ticha Beav', 'Coutumes de Ticha Beav', 'Histoire de Ticha Beav'],
    'Tou Bichevat': ['Lois de la fête de Tou Bichevat', 'Coutumes de la fête de Tou Bichevat', 'Histoire de la fête de Tou Bichevat'],
    'Yom Kippour': ['Lois de la fête de Yom Kippour', 'Coutumes de la fête de Yom Kippour', 'Histoire de la fête de Yom Kippour'],
    'Roch Hachana': ['Lois de la fête de Roch Hachana', 'Coutumes de la fête de Roch Hachana', 'Histoire de la fête de Roch Hachana'],
  },
  'Evenements': {
    'Adam-Abraham': ['Création du Monde', 'Déluge', 'Tour de Babel', 'Epreuve d\'Abraham'],
    'Abraham-Moïse': ['Esclavage', 'Sortie d\'Egypte', 'Don de la Torah', '40 années dans le désert', 'Entrée en Terre Promise'],
    'Moïse-David': ['Construction du Temple', 'Destruction du Temple'],
    'David-Exil': ['Le règne du roi Salomon', 'Division du royaume d\'Israël', 'Destruction du premier Temple', 'Exil à Babylone', 'Construction du second Temple']
  },
  'Parasha': {
    'Bereshit': ['Bereshit', 'Noah', 'Leh Lekha', 'Vayera', 'Haye Sarah', 'Toldot', 'Vayetse', 'Vayishlah', 'Vayeshev', 'Miketz', 'Vayigash', 'Vayehi'],
    'Chemot': ['Shemot', 'Vaera', 'Bo', 'Beshalah', 'Yitro', 'Mishpatim', 'Terouma', 'Tetsave', 'Ki Tissa', 'Vayakhel', 'Pekoudei'],
    'Vayikra': ['Vayikra', 'Tsav', 'Shemini', 'Tazria', 'Metzora', 'Ahare Mot', 'Kedoshim', 'Emor', 'Behar', 'BeHoukotai'],
    'Bamidbar': ['Bamidbar', 'Nasso', 'Behaalotekha', 'Chelah Lekha', 'Korah', 'Houkat', 'Balak', 'Pinhas', 'Matot', 'Massé'],
    'Devarim': ['Devarim', 'Vaet\'hanan', 'Ekev', 'Reeh', 'Choftim', 'Ki Tetse', 'Ki Tavo', 'Nitsavim', 'Vayelekh', 'Haazinou', 'Vezot Haberakha']
  },
  'Personalités': {
    'Patriaches': ['Abraham', 'Isaac', 'Jacob'],
    'Matriarches': ['Sarah', 'Rebecca', 'Rachel', 'Lea'],
    'Nassi': ['Moïse', 'Aaron', 'Miriam', 'Josué', 'Pinhas'],  
    'Prophètes': ['Moïse', 'Aaron', 'Miriam', 'Josué', 'Pinhas', 'Eli', 'Samuel', 'David', 'Salomon', 'Elie', 'Jonas', 'Mardochée', 'Ester', 'Dvora'],
    'Rois': ['Saul', 'David', 'Salomon'],
    'Sages': ['Hillel', 'Shammai', 'Rabbi Akiva', 'Rabbi Yochanan Ben Zakai', 'Rabbi Yehuda Hanassi', 'Rabbi Meir', 'Rabbi Yossi', 'Rabbi Shimon bar Yochai']
  }
};

const Home = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subSubCategory, setSubSubCategory] = useState('');

  const categories = Object.keys(categoryData);
  const subCategories = category ? Object.keys(categoryData[category]) : [];
  const subSubCategories = subCategory ? categoryData[category][subCategory] : [];

  // dans le composant Home
const handleSelect = (result) => {
  let mainCategory = '';
  let subCat = '';
  let subSubCat = '';

  // Parcourir les catégories
  for (let category in categoryData) {
    if (category === result) {
      mainCategory = category;
      break;
    }
    // Parcourir les sous-catégories
    for (let subCategory in categoryData[category]) {
      if (subCategory === result) {
        mainCategory = category;
        subCat = subCategory;
        break;
      }
      // Parcourir les sous-sous-catégories
      if (categoryData[category][subCategory].includes(result)) {
        mainCategory = category;
        subCat = subCategory;
        subSubCat = result;
        break;
      }
    }
  }

  setCategory(mainCategory);
  setSubCategory(subCat);
  setSubSubCategory(subSubCat);
};

 
  return (
    <Layout>
      <div className="home">
        <SearchBar categoryData={categoryData} onSearchSelect={handleSelect} />
        <Dropdown options={categories} value={category} onChange={setCategory} placeholder="Choisissez une catégorie" />
        {category && <Dropdown options={subCategories} value={subCategory} onChange={setSubCategory} placeholder="Choisissez une sous-catégorie" />}
        {subCategory && <Dropdown options={subSubCategories} value={subSubCategory} onChange={setSubSubCategory} placeholder="Choisissez une sous-sous-catégorie" />}
        <Button category={subSubCategory || subCategory || category} />
      </div>
    </Layout>
  );
};

export default Home;
