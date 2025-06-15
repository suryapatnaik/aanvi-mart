import React, { useState, useEffect } from "react";
import CartIcon from "../../assets/icons/CartIcon.svg";
import arrowRightIcon from "../../assets/icons/ArrowRight.svg";

const CartSection: React.FC = () => {
  const [itemCount, setItemCount] = useState(0);
  const [amount, setAmount] = useState(0);

  // Simulate cart data for demo purposes
  useEffect(() => {
    // In real app, this would come from your cart state management
    setItemCount(8);
    setAmount(450);
  }, []);

  return (
    <div className="flex items-center justify-between border border-white text-white rounded-lg p-2 min-w-[120px] bg-[#920000] bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 cursor-pointer">
      <div className="flex flex-col items-start justify-centers">
        <span className="text-xs font-medium">Items: {itemCount}</span>
        <span className="text-xs font-medium">₹{amount}</span>
      </div>
      <div className="flex items-center justify-center gap-1 ml-3">
        <img src={CartIcon} className="h-5 w-5 lg:h-6 lg:w-6" alt="cartIcon" />
        <img src={arrowRightIcon} className="h-4 w-4 lg:h-5 lg:w-5" alt="arrow-right" />
      </div>
    </div>
  );
};

export default CartSection;
