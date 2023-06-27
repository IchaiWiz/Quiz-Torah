import React from 'react';
import Layout from '../../Layout/layout';
import Button from './Button';
import './Accueil.css';
import Navbar from './NavBar';
import HomeBody from './HomeBody';

const Home = () => {
  return (
    <Layout>
      <Navbar/>
      <HomeBody />
        <Button/>
    </Layout>
  );
};

export default Home;
