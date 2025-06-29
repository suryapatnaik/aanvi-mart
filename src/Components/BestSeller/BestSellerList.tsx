import React from "react";
import AddToCartBtn from "../AddToCartBtn";
import SectionTitle from "../SectionTitle";

interface BestSellerItem {
  image: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  buttonLabel?: string;
}

interface BestSellerListProps {
  title: string;
  subtitle?: string;
  items: BestSellerItem[];
}

const BestSellerList: React.FC<BestSellerListProps> = ({
  title,
  subtitle,
  items,
}) => {
  return (
    <section className="py-8">
      <SectionTitle title={title} subtitle={subtitle} />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 pt-4 flex flex-col items-center relative"
          >
            <div className="relative w-full h-36 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-cover rounded-xl"
              />
              <span className="absolute top-2 right-2 bg-red-700 text-white font-bold text-sm rounded-md px-3 py-1">
                {item.discount} % OFF
              </span>
            </div>
            <div className="w-full flex flex-col gap-2 h-full justify-between">
              <div>
                <h3 className="text-lg font-semibold m-0">{item.name}</h3>
                <p className="text-gray-600 text-sm my-1">{item.description}</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">₹ {item.price}</span>
                  <span className="line-through text-gray-500 text-base">
                    ₹ {item.originalPrice}
                  </span>
                </div>
              </div>
              <AddToCartBtn
                id={item.name}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellerList;
