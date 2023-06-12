import React from 'react'
import Header from '../components/Header/header'
import Footer from '../components/Footer/footer'

const layout = ({children}) => {
  return (
    <>
    <Header />
    {children}
    <Footer />
    </>
  )
}

export default layout