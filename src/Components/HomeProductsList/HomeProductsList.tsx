import React from "react";
import { useNavigate } from "react-router-dom";
import AddToCartBtn from "../AddToCartBtn";
import WishlistButton from "../WishlistButton";
import SectionTitle from "../SectionTitle";
import { getProductById } from "../../utils/mockData";

interface ProductItem {
  image: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  buttonLabel?: string;
  id?: string;
}

interface HomeProductsListProps {
  title: string;
  subtitle?: string;
  items: ProductItem[];
}

const HomeProductsList: React.FC<HomeProductsListProps> = ({
  title,
  subtitle,
  items,
}) => {
  const navigate = useNavigate();

  const handleProductClick = (item: ProductItem) => {
    if (item.id) {
      navigate(`/product/${item.id}`);
    }
  };

  return (
    <section className="space-y-6">
      <SectionTitle title={title} subtitle={subtitle} />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((item, idx) => {
          // Get the full product data for wishlist functionality
          const product = item.id ? getProductById(item.id) : null;
          
          return (
            <div
              key={idx}
              className="flex flex-col items-center relative cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleProductClick(item)}
            >
              <div className="relative w-full h-36 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-36 object-cover rounded-xl"
                />
                <span className="absolute top-2 left-2 bg-red-700 text-white font-bold text-[10px] md:text-xs rounded-md px-1.5 py-0.5">
                  {item.discount} % OFF
                </span>
                {/* Wishlist Button */}
                {product && (
                  <WishlistButton 
                    product={product} 
                    size="sm"
                    className="top-2 right-2"
                  />
                )}
              </div>
              <div className="w-full flex flex-col gap-2 h-full justify-between">
                <div>
                  <h3 className="text-xs md:text-sm font-semibold m-0">{item.name}</h3>
                  <p className="text-gray-600 text-[10px] md:text-xs my-1">{item.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs md:text-sm">₹ {item.price}</span>
                    <span className="line-through text-gray-500 text-[10px] md:text-xs">
                      ₹ {item.originalPrice}
                    </span>
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <AddToCartBtn
                    id={item.id || item.name}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    description={item.description}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeProductsList; 