import React from "react";
import BannerSection from "../Components/BannerSection/BannerSection";
import ProductMoto from "../Components/ProductMoto/ProductMoto";
import Categories from "../Components/categories/Categories";
import HomeProductsList from "../Components/HomeProductsList/HomeProductsList";
import Testimonials from "../Components/Testimonials";
import { getBestSellerProducts, testimonialsData } from "../utils/mockData";

const Home: React.FC = () => {
  const bestSellerProducts = getBestSellerProducts();
  
  // Convert to the format expected by HomeProductsList
  const bestSellerData = bestSellerProducts.map(product => ({
    id: product.id,
    image: product.image,
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice || product.price,
    discount: product.discount || 0,
  }));

  return (
    <div className="flex flex-col py-8 space-y-8">
      {/* Banner Section */}
      <BannerSection />
      <ProductMoto />
      <Categories />
      <HomeProductsList title="Bestsellers" subtitle="Shop Our Top Products" items={bestSellerData} />
      <Testimonials testimonials={testimonialsData} />
    </div>
  );
};

export default Home;
