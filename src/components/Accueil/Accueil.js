import React from 'react';
import Footer from '../Footer/footer';
import Button from './Button';
import './Accueil.css';
import Navbar from './NavBar';
import HomeBody from './HomeBody';

const Home = () => {
  return (
    <>
      <Navbar/>
      <HomeBody />
      <Button/>
      <Footer />
    </>
  );
};

export default Home;
