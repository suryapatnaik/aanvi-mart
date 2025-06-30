import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../utils/categories/categories.helpers";
import SectionTitle from "../../Components/SectionTitle";

interface CategoriesProps {
  onClose?: () => void;
}

const Categories: React.FC<CategoriesProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryValue: string) => {
    navigate(`/category/${categoryValue}`);
    // Close the modal if onClose function is provided
    if (onClose) {
      onClose();
    }
  };

  return (
    <section id="categories-section" className="space-y-6 ">
      <SectionTitle title="Explore Categories" subtitle="Freshest meats and much more!" />
      {/* Categories Grid */}
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-2 md:gap-x-8">
        {categories.map((cat) => (
          <div 
            key={cat.value} 
            className="flex flex-col items-start cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => handleCategoryClick(cat.value)}
          >
            <img
              src={cat.imageSrc}
              alt={cat.label}
              className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-xl object-cover mb-2 shadow-sm"
            />
            <span className="text-xs md:text-sm font-normal text-center mt- text-nowrap">
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
