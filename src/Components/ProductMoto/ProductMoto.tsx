import React from 'react';
import CheckedIcon from '../../assets/icons/CheckedIcon.svg'

const ProductMoto: React.FC = () => {
  return (
    <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-lora text-gray-900 mb-8">
          Anvi - Promise you the best quality meat
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <MotoPoint text="Fresh & Juicy cuts" />
          <MotoPoint text="We maintain hygiene" />
          <MotoPoint text="Delivery to your doorstep" />
        </div>
      </div>
    </section>
  );
};

const MotoPoint: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-700">
    <img src={CheckedIcon} className="h-5 w-5" alt="check-icon" />
    <span>{text}</span>
  </div>
);

export default ProductMoto;
