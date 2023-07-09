import React, { useEffect, useState } from 'react';
import QuizCard from './QuizCard';

const HomeBody = () => {
  const [randomCategory, setRandomCategory] = useState(null);

  useEffect(() => {
    console.log('Fetching random category...');
    fetch('http://localhost:5000/random_category') // <-- Notez que j'ai ajouté "http://localhost:5000"
      .then(response => {
        console.log('Response received:', response);
        if (!response.ok) {
          return response.text().then(text => Promise.reject(`Response not OK. Text: ${text}`));
        }
        return response.text().then(text => {
          console.log('Response text:', text);
          return JSON.parse(text);
        });
      })
      .then(data => {
        console.log('Data received:', data);
        setRandomCategory(data);
      })
      .catch(error => console.error('Error fetching random category:', error));
  }, []);
  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', paddingTop: '35px', paddingBottom: '15px' }}>
      {randomCategory && (
        <QuizCard
          title={randomCategory.name}
          description={randomCategory.description}
          imageUrl={randomCategory.image_url}
        />
      )}
      <QuizCard title="Parasha Korah" description="Une description de la Parasha Korah." />
      <QuizCard title="Ticha Beav" description="Une description de Ticha Beav." />
    </div>
  );
};

export default HomeBody;
