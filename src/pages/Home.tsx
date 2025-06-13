import React from "react";
import BannerSection from "../components/BannerSection/BannerSection";
import ProductMoto from "../components/ProductMoto/ProductMoto";
import Categories from "../components/categories/Categories";
import HomeProductsList from "../components/HomeProductsList/HomeProductsList";
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
