import React from 'react'
import Header from '../Components/Header/Header'
import BannerSection from '../Components/BannerSection/BannerSection'
import ProductMoto from '../Components/ProductMoto/ProductMoto'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BannerSection />
      <ProductMoto/>
    </div>
  )
}

export default Home
