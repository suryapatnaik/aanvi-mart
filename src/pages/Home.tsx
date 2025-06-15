import React from "react";
import BannerSection from "../Components/BannerSection/BannerSection";
import ProductMoto from "../Components/ProductMoto/ProductMoto";
import Categories from "../Components/categories/Categories";
import HomeProductsList from "../Components/HomeProductsList/HomeProductsList";
import { bestSellerData } from "../utils/mockData";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen py-8 space-y-8">
      <BannerSection />
      <ProductMoto />
      <Categories />
      <HomeProductsList title="Bestsellers" subtitle="Shop Our Top Products" items={bestSellerData} />
    </div>
  );
};

export default Home;
