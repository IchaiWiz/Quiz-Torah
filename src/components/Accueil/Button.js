import React, { useContext } from 'react';
import CategoryContext from './CategoryContext';
import Button from '@mui/material/Button';
import QuizIcon from '@mui/icons-material/Quiz'; // Importez l'icône Quiz de Material-UI

const CategoryButton = () => {
    const {
        selectedCategory,
        selectedSubCategory,
        selectedSubSubCategory,
        selectedSubSubSubCategory
    } = useContext(CategoryContext);

    let selectedName = '';
    let mainCategoryName = '';

    if (selectedSubSubSubCategory) {
        selectedName = selectedSubSubSubCategory.name;
        mainCategoryName = selectedCategory ? selectedCategory.name : '';
    } else if (selectedSubSubCategory) {
        selectedName = selectedSubSubCategory.name;
        mainCategoryName = selectedCategory ? selectedCategory.name : '';
    } else if (selectedSubCategory) {
        selectedName = selectedSubCategory.name;
        mainCategoryName = selectedCategory ? selectedCategory.name : '';
    } else if (selectedCategory) {
        selectedName = selectedCategory.name;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
                variant="contained"
                endIcon={<QuizIcon />}
                style={{ width: '47%', margin: '18px' }}
            >
                {selectedName ? `Accéder au quiz sur la catégorie "${selectedName}"${mainCategoryName ? ` (${mainCategoryName})` : ''}` : 'Sélectionnez une catégorie'}
            </Button>
        </div>
    );
};

export default CategoryButton;
