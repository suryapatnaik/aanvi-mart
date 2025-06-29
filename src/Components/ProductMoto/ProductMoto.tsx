import React from 'react';
import CheckedIcon from '../../assets/icons/CheckedIcon.svg'

const ProductMoto: React.FC = () => {
  return (
    <div className="bg-white text-center py-5 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-bold font-lora mb-6">
        Anvi - Promise you the best quality meat
      </h2>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-gray-700 sm:text-nowrap">
        <MotoPoint text="Fresh & Juicy cuts" />
        <MotoPoint text="We maintain hygiene" />
        <MotoPoint text="Delivery to your doorstep" />
      </div>
    </div>
  );
};

const MotoPoint: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-2 text-sm sm:text-base">
    {/* <CheckCircle2 className="text-[#920000]" size={20} /> */}
    <img src={CheckedIcon} className="h-5 w-5" alt='check-icon'></img>
    <span>{text}</span>
  </div>
);

export default ProductMoto;
