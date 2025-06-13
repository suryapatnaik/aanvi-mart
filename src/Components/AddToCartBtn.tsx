import React, { useState } from 'react';

interface AddToCartBtnProps {
  className?: string;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({ className = '' }) => {
  const [count, setCount] = useState(0);

  if (count === 0) {
    return (
      <button
        className={`cursor-pointer border border-red-700 rounded-lg bg-white text-red-700 font-semibold text-lg px-4 py-2 transition-colors duration-200 hover:bg-red-50 ${className}`}
        onClick={() => setCount(1)}
      >
        ADD <span className="font-bold text-xl">+</span>
      </button>
    );
  }

  return (
    <div className={`flex items-center justify-between border border-red-700 rounded-lg bg-white text-red-700 font-semibold text-lg px-2 py-2 ${className}`}>
      <button
        className="px-3 text-xl font-bold focus:outline-none cursor-pointer"
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
      <span className="px-2 select-none">{count}</span>
      <button
        className="px-3 text-xl font-bold focus:outline-none cursor-pointer"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
};

export default AddToCartBtn; 