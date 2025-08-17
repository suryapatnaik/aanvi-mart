import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ArrowRight from "../../assets/icons/ArrowRight.svg";
interface ViewCartButtonProps {
  onClick: () => void;
}

const ViewCartButton: React.FC<ViewCartButtonProps> = ({ onClick }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <div className="sm:hidden fixed bottom-24 left-4 right-4 z-30">
      <button
        onClick={onClick}
        className="w-full bg-blue-500 text-white rounded-lg py-4 px-6 shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-between"
      >
        <div className="text-left">
          <span className="font-medium">Total Items: {totalItems}</span>
        </div>
        <div className="text-right">
          <span className="font-medium flex items-center gap-2">Cart <img src={ArrowRight} alt="arrow-right" className="w-4 h-4"></img></span>
        </div>
      </button>
    </div>
  );
};

export default ViewCartButton;
