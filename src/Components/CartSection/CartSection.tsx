import React from "react";
import CartIcon from "../../assets/icons/CartIcon.svg";
import arrowRightIcon from "../../assets/icons/ArrowRight.svg";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const CartSection: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  let items: any[] = [];
  let itemCount = 0;
  let amount = 0;

  try {
    items = useSelector((state: RootState) => state.cart.items);
    itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  } catch (error) {
    console.error('Error accessing cart state:', error);
    // Provide fallback values
    items = [];
    itemCount = 0;
    amount = 0;
  }

  return (
    <div onClick={onClick} className="flex items-center justify-between border border-white text-white rounded-lg p-2 min-w-[120px] bg-[#920000] bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 cursor-pointer">
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
