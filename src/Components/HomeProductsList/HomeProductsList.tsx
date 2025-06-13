import React from "react";
import AddToCartBtn from "../AddToCartBtn";
import SectionTitle from "../SectionTitle";

interface ProductItem {
  image: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  buttonLabel?: string;
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
  return (
    <section className="space-y-6">
      <SectionTitle title={title} subtitle={subtitle} />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center relative"
          >
            <div className="relative w-full h-36 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-cover rounded-xl"
              />
              <span className="absolute top-2 right-2 bg-red-700 text-white font-bold text-[10px] md:text-xs rounded-md px-1.5 py-0.5">
                {item.discount} % OFF
              </span>
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
              <AddToCartBtn className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProductsList; 